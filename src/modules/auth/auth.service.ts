import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { hash } from 'src/common/security/hash';
import { encryptValue } from 'src/common/security/encript';
import { UserRepo } from 'src/database/reposetories/user-repo';
import { EmailEnum } from 'src/common/enums/emailEnum';
import { generateOtp, sendMail } from 'src/common/services/mailService/sendMail';
import { emailTemplete } from 'src/common/services/mailService/mailTemplete';
import { eventEmitter } from 'src/common/services/mailService/email.event';
import type { RedisClientType } from 'redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
@Inject("REDIS_CLIENT")
  private readonly redisService: RedisClientType,  ) { }



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
}
