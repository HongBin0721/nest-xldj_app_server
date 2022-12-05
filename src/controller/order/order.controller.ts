import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderStatusCreateDto } from './dto/order.status.create.dto';
import { OrderConfirmDto } from './dto/order.confirm.dto';
import { OrderCreateDto } from './dto/order.create.dto';
import { OrderListsDto } from './dto/order.lists.dto';
import { OrderDetailDto } from './dto/order.detail.dto';
import { OrderCancelDto } from './dto/order.cancel.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/status/lists')
  async statusLists(@Body() @Request() req) {
    try {
      return await this.orderService.findOrderStatusLists();
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/status/create')
  async statusCreate(@Body() body: OrderStatusCreateDto, @Request() req) {
    try {
      return await this.orderService.orderStatusCreate({ data: body });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/confirm')
  async confirm(@Body() body: OrderConfirmDto, @Request() req) {
    try {
      return await this.orderService.orderConfirm({
        data: body,
        user_id: req.user.id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() body: OrderCreateDto, @Request() req) {
    try {
      return await this.orderService.createOrder(body, req.user.id);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/lists')
  async lists(@Body() body: OrderListsDto, @Request() req) {
    try {
      return await this.orderService.lists({ ...body });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/detail')
  async detail(@Body() body: OrderDetailDto, @Request() req) {
    try {
      return await this.orderService.detail({ order_no: body.order_no });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cancel')
  async cancel(@Body() body: OrderCancelDto, @Request() req) {
    try {
      return await this.orderService.cancelOrder({ order_no: body.order_no });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
