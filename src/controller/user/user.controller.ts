import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/controller/auth/guards/jwt-auth.guard';
import { EmailRegisterBodyDto } from './dto/emailRegisterbody.dto';
import { ListsDto } from './dto/lists.dto';
import { LoginHistoryDto } from './dto/login_history.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('lists')
  lists(@Request() req, @Body() body: ListsDto): object {
    return this.userService.getUsers({
      ...body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('addRole')
  addUserRole(@Body() appBody): object {
    return this.userService.addUserRole(appBody.user_id, appBody.role_id);
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
  loginHistory(@Request() req, @Body() body: LoginHistoryDto): object {
    return this.userService.loginHistory({
      ...body,
      user_id: req.user.id,
    });
  }
}
