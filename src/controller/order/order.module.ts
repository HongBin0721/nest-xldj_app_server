import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/models/order.model';
import { OrderStatus } from 'src/models/order_status.model';
import { PaymentMethod } from 'src/models/payment_method.model';
import { Address } from 'src/models/address.model';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Order,
      OrderStatus,
      PaymentMethod,
      Address,
      User,
      Product,
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}