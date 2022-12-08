import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmailRegisterBodyDto } from './dto/email_register_body.dto';
import { ListsDto } from './dto/lists.dto';
import { LoginHistoryDto } from './dto/login_history.dto';
import { SetPasswordDto } from './dto/set_password.dto';
import { UpdateDto } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('lists')
  lists(@Request() req, @Body() body: ListsDto): object {
    return this.userService.getUsers({
      ...body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  async detail(@Request() req): Promise<object> {
    try {
      return await this.userService.detail({
        where: {
          id: req.user.id,
        },
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('addRole')
  async addUserRole(@Body() appBody): Promise<object> {
    try {
      return await this.userService.addUserRole(
        appBody.user_id,
        appBody.role_id,
      );
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Post('register/email')
  emailRegister(@Body() appBody: EmailRegisterBodyDto): object {
    return this.userService.emailRegister(appBody);
  }
  // @Post('remove')
  // removeUser(@Body() appBody): object {
  //   return this.userService.removeUser(appBody.id);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('follow')
  followUser(@Body() appBody, @Request() req): object {
    return this.userService.follow(req.user.id, appBody.follow_user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow/lists')
  followList(@Body() appBody, @Request() req): object {
    return this.userService.getMyFollowList({
      user_id: req.user.id,
      page_size: appBody.page_size,
      page_index: appBody.page_index,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfollow')
  unFollowUser(@Body() appBody, @Request() req): object {
    return this.userService.unFollow(req.user.id, appBody.unfollow_user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mutual')
  getMutualFollow(@Body() appBody, @Request() req): object {
    return this.userService.getMutualFollow({
      user_id: req.user.id,
      page_index: appBody.page_index,
      page_size: appBody.page_size,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('loginHistory')
  async loginHistory(
    @Request() req,
    @Body() body: LoginHistoryDto,
  ): Promise<object> {
    try {
      return await this.userService.loginHistory({
        ...body,
        user_id: req.user.id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Request() req, @Body() body: UpdateDto): Promise<object> {
    try {
      return await this.userService.update({
        data: body,
        where: {
          id: body.user_id,
        },
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('setPassword')
  async setPassword(
    @Request() req,
    @Body() body: SetPasswordDto,
  ): Promise<object> {
    try {
      const isValidateSuccess = await this.authService.userValidate({
        user_id: body.user_id,
        password: body.oldPassword,
      });
      if (!isValidateSuccess)
        throw {
          message: '旧密码错误',
        };

      return await this.userService.setPassword({
        newPassword: body.newPassword,
        user_id: body.user_id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
