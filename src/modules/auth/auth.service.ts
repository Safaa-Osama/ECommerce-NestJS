import { BadRequestException, ConflictException, Injectable, UploadedFile } from '@nestjs/common';
import { SignUpDto, LoginDto, ConfirmDto } from './dto/signUp.dto';
import { compare, hash } from 'src/common/security/hash';
import { encryptValue } from 'src/common/security/encript';
import { UserRepo } from 'src/database/reposetories/user-repo';
import { EmailEnum } from 'src/common/enums/emailEnum';
import { generateOtp, sendMail } from 'src/common/services/mailService/sendMail';
import { emailTemplete } from 'src/common/services/mailService/mailTemplete';
import { eventEmitter } from 'src/common/services/mailService/email.event';
import RedisService from 'src/common/services/redis/redis.service';
import { ProviderEnum } from 'src/common/enums/userEnum';
import { randomUUID } from 'crypto';
import { TokenService } from 'src/common/services/token/tokenService';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly redisService: RedisService,
    private readonly tokenService: TokenService,
  ) { }

  async signUp(body: SignUpDto) {
    const { userName, role, gender, email, age, password, cPassword, profilePic, phone } = body;
    const emailExist = await this.userRepo.findOne({ filter: { email } });

    if (emailExist) {
      throw new ConflictException('email already exist');
    }
    if (profilePic) {
      //save image on cloud
      // const uploadedImage = await UploadedFile(profilePic)
    }

    const user = await this.userRepo.create({
      userName,
      role,
      gender,
      email,
      age,
      password: hash({ text: password }),
      phone: encryptValue({ value: phone }),
      // profilePic: uploadedImage
    });

    const otp = generateOtp();

    const isBlocked = await this.redisService.ttl(this.redisService.blockOtp(email))
    if (isBlocked && isBlocked > 0) {
      throw new BadRequestException(`You are blocked, Try again after ${isBlocked} seconds`)
    }

    const ttl = await this.redisService.ttl(this.redisService.otpKey({ email, subject: EmailEnum.confirmEmail }));
    if (ttl && ttl > 0) {
      throw new BadRequestException(`can not sent OTP after ${ttl} seconds`)
    }

    const maximumOtp = await this.redisService.getValue(this.redisService.maxOtp(email))
    if (maximumOtp > 3) {
      await this.redisService.setValue({ key: this.redisService.blockOtp(email), value: "1", ttl: 60 * 3 })
      throw new BadRequestException("you have exceeded the maximum number of tries")
    }

    eventEmitter.emit(EmailEnum.confirmEmail, async () => {
      await sendMail({
        to: email,
        subject: "Welcome to Ecommerce-App",
        html: emailTemplete({ otp, userName })
      });
    });

    return { user, otp };
  }

  async signIn(body: LoginDto) {
    let { email, password }: LoginDto = body;

    let user = await this.userRepo.findOne({
      filter: {
        email,
        provider: ProviderEnum.system,
        confirmed: true
      }
    })
    if (!user) {
      throw new BadRequestException("User is not exist")
    }

    if (!(compare({ text: password, cipherTxt: user.password }))) {
      throw new BadRequestException("invalid password")
    }

    const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = await this.tokenService.getSignature(user.role);

    const uuid = randomUUID()
    const accessToken = await this.tokenService.generateToken({
      payload: {
        id: user._id,
        email
      },
      options: {
        secret: ACCESS_SECRET_KEY,
        expiresIn: 60 * 60, jwtid: uuid
      }
    })

    const refreshToken = await this.tokenService.generateToken({
      payload: {
        id: user._id,
        email
      },
      options: {
        secret: REFRESH_SECRET_KEY,
        expiresIn: '1y', jwtid: uuid
      }
    })

    return {
      accessToken,
      refreshToken
    }
  }
  async confirmEmail(body: ConfirmDto) {
    const { email, otp }: ConfirmDto = body

    const otpExist = await this.redisService.getValue(
      this.redisService.otpKey({
        email, subject: EmailEnum.confirmEmail
      })
    )
    if (!otpExist) {
      throw new BadRequestException("Expired OTP or Invalid email")
    }

    if (!compare({ text: String(otp), cipherTxt: otpExist })) {
      throw new BadRequestException("Invalid OTP")
    }

    const user = await this.userRepo.findOneAndUpdate({
      filter: {
        email,
        confirmed: false,
        provider: ProviderEnum.system
      },
      update: { confirmed: true }
    })
    if (!user) {
      throw new BadRequestException("User is not exist or already confirmed")
    }
    await this.redisService.delKey(this.redisService.otpKey({ email, subject: EmailEnum.confirmEmail }))
    await this.redisService.delKey(this.redisService.maxOtp(email))

    return {
      message: "Email confirmed",
      data: user
    }
  }


} 