import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './schemas/dto/signup.dto';
import { Gender } from './schemas/user.schema';
import { SignInDto } from './schemas/dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signUpDto: SignUpDto): Promise<{
    payload: {
      name: string;
      email: string;
      gender: Gender;
      accessToken: string;
    };
  }> {
    return this.authService.signup(signUpDto);
  }

  @Post('/signin')
  login(@Body() signInDto: SignInDto): Promise<{
    payload: {
      name: string;
      email: string;
      gender: Gender;
      accessToken: string;
    };
  }> {
    return this.authService.signin(signInDto);
  }
}
