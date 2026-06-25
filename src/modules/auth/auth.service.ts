import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { hash } from 'src/common/security/hash';
import { encryptValue } from 'src/common/security/encript';
import { UserRepo } from 'src/database/reposetories/user-repo';
import { EmailEnum } from 'src/common/enums/emailEnum';
import { generateOtp, sendMail } from 'src/common/services/mailService/sendMail';
import { emailTemplete } from 'src/common/services/mailService/mailTemplete';
import { eventEmitter } from 'src/common/services/mailService/email.event';
import RedisService from 'src/common/services/redis/redis.service';
import { ProviderEnum } from 'src/common/enums/userEnum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly redisService: RedisService,
  ) { }

  async signUp(body: SignUpDto) {
    const { userName, role, gender, email, age, password, cPassword, profilePic, phone } = body;
    const emailExist = await this.userRepo.findOne({ filter: { email } });

    if (emailExist) {
      throw new ConflictException('email already exist');
    }
    if (profilePic) {
      //save image on cloud
    }

    const user = await this.userRepo.create({
      userName,
      role,
      gender,
      email,
      age,
      password: hash({ text: password }),
      phone: encryptValue({ value: phone }),
      profilePic
    });

    const otp = generateOtp();

    const isBlocked = await this.redisService.ttl(this.redisService.blockOtp(email))
    if (isBlocked && isBlocked > 0) {
      throw new Error(`You are blocked, Try again after ${isBlocked} seconds`)
    }

    const ttl = await this.redisService.ttl(this.redisService.otpKey({ email, subject: EmailEnum.confirmEmail }));
    if (ttl && ttl > 0) {
      throw new Error(`can not sent OTP after ${ttl} seconds`)
    }

    const maximumOtp = await this.redisService.getValue(this.redisService.maxOtp(email))
    if (maximumOtp > 3) {
      await this.redisService.setValue({ key: this.redisService.blockOtp(email), value: "1", ttl: 60 * 3 })
      throw new Error("you have exceeded the maximum number of tries")
    }

    eventEmitter.emit(EmailEnum.confirmEmail, async () => {
      await sendMail({
        to: email,
        subject: "Welcome to SocailMedia-App",
        html: emailTemplete({ otp, userName })
      });
    });

    return { user, otp };
  }


  login(body: LoginDto) {
    const { email, password }: LoginDto = body;
    return { email, password };
  }




  // confirmEmail = async (body:any) => {
  //       const { email, otp } = body

  //       const otpExist = await this.redisService.getValue(
  //           this.redisService.otpKey({
  //               email, subject: EmailEnum.confirmEmail
  //           })
  //       )
  //       if (!otpExist) {
  //           throw new BadRequestException("Expired OTP or Invalid email")
  //       }

  //       const user = await this.userRepo.findOneAndUpdate({
  //           filter: {
  //               email,
  //               confirmed: false,
  //               provider: ProviderEnum.system
  //           },
  //           update: { confirmed: true }
  //       })
  //       if (!user) {
  //           throw new ConflictException("User is not exist or already confirmed")
  //       }
  //       await this.redisService.delKey(this.redisService.otpKey({ email, subject: EmailEnum.confirmEmail }))
  //       await this.redisService.delKey(this.redisService.maxOtp(email))

  //       return { user, message: "Email confirmed" }
  //   }

}
