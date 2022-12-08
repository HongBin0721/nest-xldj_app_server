import { Body, Controller, Post, Request, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as dayjs from 'dayjs';
import { RealIP } from 'nestjs-real-ip';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/phone')
  async phoneLogin(
    @Request() req,
    @Body() body,
    @RealIP() ip: string,
  ): Promise<object> {
    try {
      console.log('ip地址', ip);
      const user = await this.authService.phoneLoginValidate(
        body.tel,
        body.password,
        body.code,
      );

      if (!user) {
        throw {
          message: '用户名或密码错误',
        };
      }
      await this.authService.createLoginHistory({ user: user, ip });
      return {
        token: this.authService.createToken(user),
        expireDate: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        info: user,
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
