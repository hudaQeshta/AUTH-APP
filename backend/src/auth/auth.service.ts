import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender, User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './schemas/dto/signup.dto';
import { SignInDto } from './schemas/dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<{
    payload: {
      name: string;
      email: string;
      gender: Gender;
      accessToken: string;
    };
  }> {
    const { name, email, gender, password } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id, email: user.email });
    let userInfo = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      accessToken: token,
    };
    return { payload: userInfo };
  }

  async signin(loginDto: SignInDto): Promise<{
    payload: {
      name: string;
      email: string;
      gender: Gender;
      accessToken: string;
    };
  }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });

    let userInfo = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      accessToken: token,
    };
    return { payload: userInfo };
  }
}
