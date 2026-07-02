import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto, LoginDto, ConfirmDto, EmailDto, UpdatePassDto, ResetPasswordDto } from './dto/auth.dto';
import { compare, hash } from '../../common/services/securityService/hash';
import { encryptValue } from '../../common/services/securityService/encript';
import { UserRepo } from 'src/common/reposetories/user-repo';
import { EmailEnum } from 'src/common/enums/emailEnum';
import { generateOtp, sendMail } from 'src/common/services/mailService/sendMail';
import { emailTemplete } from 'src/common/services/mailService/mailTemplete';
import { eventEmitter } from 'src/common/services/mailService/email.event';
import RedisService from 'src/common/services/redis/redis.service';
import { ProviderEnum, RoleEnum } from 'src/common/enums/userEnum';
import { randomUUID } from 'crypto';
import { TokenService } from 'src/common/services/token/tokenService';
import { Types } from 'mongoose';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly redisService: RedisService,
    private readonly tokenService: TokenService,
  ) { }


  sendEmail = async ({ email, subject }: { email: string, subject: EmailEnum }) => {

    const isBlocked = await this.redisService.ttl(this.redisService.blockOtp(email))
    if (isBlocked && isBlocked > 0) {
      throw new BadRequestException(`You are blocked, Try again after ${isBlocked} seconds`)
    }

    const ttl = await this.redisService.ttl(this.redisService.otpKey({ email, subject }));
    if (ttl && ttl > 0) {
      throw new BadRequestException(`can not sent OTP after ${ttl} seconds`)
    }

    const maximumOtp = await this.redisService.getValue(this.redisService.maxOtp(email))
    if (maximumOtp > 3) {
      await this.redisService.setValue({ key: this.redisService.blockOtp(email), value: "1", ttl: 60 * 3 })
      throw new BadRequestException("you have exceeded the maximum number of tries")
    }

    const otp = await generateOtp();
    eventEmitter.emit(subject, async () => {
      await sendMail({
        to: email,
        subject: "Ecommerce-App",
        html: emailTemplete({ otp })
      })
    }
    )

    await this.redisService.setValue({
      key: this.redisService.otpKey({ email, subject }),
      value: hash({ text: `${otp}` }),
      ttl: 60 * 3
    });

    await this.redisService.inc(this.redisService.maxOtp(email))
  }

  async signUp(body: SignUpDto) {
    const { userName, role, gender, email, age, password, cPassword, profilePic, phone } = body;
    const emailExist = await this.userRepo.findOne({ filter: { email } });

    if (emailExist) {
      throw new ConflictException('email already exist');
    }

    // upload profile picture
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

    //send Email
    await this.sendEmail({ email, subject: EmailEnum.confirmEmail })

    return { user };
  }

  async signIn(body: LoginDto) {
    let { email, password }: LoginDto = body;

    let user = await this.userRepo.findOne({
      filter: {
        email,
        provider: ProviderEnum.system
      }
    })
    if (!user) {
      throw new BadRequestException("User is not exist")
    }

    if (!(compare({ text: password, cipherTxt: user.password }))) {
      throw new BadRequestException("invalid password")
    }

    const prefix = user.role === RoleEnum.admin ? process.env.PREFIX_ADMIN! : process.env.PREFIX_USER!;
    const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = await this.tokenService.getSignature(prefix);

    const uuid = randomUUID()
    const accessToken = await this.tokenService.generateToken({
      payload: {
        id: user._id,
        email
      },
      options: {
        secret: ACCESS_SECRET_KEY,
        expiresIn: 60 * 60,
        jwtid: uuid
      }
    })

    const refreshToken = await this.tokenService.generateToken({
      payload: {
        id: user._id,
        email
      },
      options: {
        secret: REFRESH_SECRET_KEY,
        expiresIn: '1y',
        jwtid: uuid
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
        confirmEmail: false,
        provider: ProviderEnum.system
      },
      update: { confirmEmail: true }
    })
    if (!user) {
      throw new BadRequestException("User is not exist or already confirmed")
    }
    await this.redisService.delKey(this.redisService.otpKey({ email, subject: EmailEnum.confirmEmail }))
    await this.redisService.delKey(this.redisService.maxOtp(email))

    return { message: "Email confirmed" }
  }


  async resendOtp(body: EmailDto) {

    const { email }: EmailDto = body

    const user = await this.userRepo.findOne({
      filter: { email, confirmEmail: true, provider: ProviderEnum.system }
    })

    if (!user) {
      throw new BadRequestException("User is not exist or Emial is not confirmed")
    }

    await this.sendEmail({ email, subject: EmailEnum.confirmEmail })

    return { message: "Otp send again" }
  }

  async updatePassword(userId: Types.ObjectId, body: UpdatePassDto) {
    let { newPassword, oldPassword, cPassword }: UpdatePassDto = body

    const user = await this.userRepo.findOne({
      filter: {
        _id: userId,
        provider: ProviderEnum.system,
        confirmEmail: true
      }
    })
    if (!user) {
      throw new BadRequestException("User is not exist or invalid provider")
    }

    if (!compare({ text: oldPassword, cipherTxt: user.password })) {
      throw new BadRequestException("invalid old password")
    }

    await this.userRepo.findOneAndUpdate({
      filter: { _id: userId },
      update: { password: hash({ text: newPassword }) }
    })

    return { message: "Password updated successfully" }
  }

  async resetPassword(body: ResetPasswordDto) {
    const { email, otp, password } = body;

    const otpExist = await this.redisService.getValue(
      this.redisService.otpKey({
        email, subject: EmailEnum.forgetPassword
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
        confirmEmail: true,
        provider: ProviderEnum.system
      },
      update: { password: hash({ text: password }) }
    })
    if (!user) {
      throw new BadRequestException("User is not exist or not confirmed")
    }

    await this.redisService.delKey(this.redisService.otpKey({ email, subject: EmailEnum.forgetPassword }))
    await this.redisService.delKey(this.redisService.maxOtp(email))

    return { message: "Password changed successfully" }
  }
}
