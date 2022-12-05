import {
  Controller,
  Post,
  HttpException,
  UseGuards,
  Body,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { DetailDto } from './dto/detail.dto';
import { FavoriteDto } from './dto/favorite.dto';
import { ListsDto } from './dto/lists.dto';
import { UnitCreateDto } from './dto/unit.create.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/lists')
  async lists(@Body() body: ListsDto, @Request() req) {
    try {
      return await this.productService.lists(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() body: CreateDto, @Request() req) {
    try {
      return await this.productService.create({ data: body });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/unit/create')
  async unitCreate(@Body() body: UnitCreateDto, @Request() req) {
    try {
      return await this.productService.unitCreate({ data: body });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/unit')
  async unit() {
    try {
      return await this.productService.getUnit();
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  // 收藏
  @UseGuards(JwtAuthGuard)
  @Post('/favorite')
  async favorite(@Body() body: FavoriteDto, @Request() req) {
    try {
      return await this.productService.favorite({
        user_id: req.user.id,
        product_id: body.product_id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  // 取消收藏
  @UseGuards(JwtAuthGuard)
  @Post('/cancelFavorite')
  async cancelFavorite(@Body() body: FavoriteDto, @Request() req) {
    try {
      return await this.productService.cancelFavorite({
        user_id: req.user.id,
        product_id: body.product_id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  // 获取产品详情
  @UseGuards(JwtAuthGuard)
  @Post('/detail')
  async detail(@Body() body: DetailDto, @Request() req) {
    try {
      return await this.productService.getDetail({
        product_id: body.product_id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
