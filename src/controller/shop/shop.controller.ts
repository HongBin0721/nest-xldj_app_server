import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { FollowDto } from './dto/follow.dto';
import { ListsDto } from './dto/lists.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() appBody: CreateDto, @Request() req): Promise<object> {
    try {
      return await this.shopService.create({
        user_id: req.user.id,
        data: appBody,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('lists')
  async lists(@Request() req, @Body() body: ListsDto): Promise<object> {
    try {
      return this.shopService.lists({ user_id: req.user.id, ...body });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow')
  async follow(@Request() req, @Body() body: FollowDto) {
    try {
      return await this.shopService.followShop({
        user_id: req.user.id,
        shop_id: body.shop_id,
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error, 400);
    }
  }
}
