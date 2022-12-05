import { Order } from './../../models/order.model';
import { ProductImage } from 'src/models/product_image.mode';
import { Product } from 'src/models/product.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from 'src/models/shop.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductUnit } from 'src/models/product_unit.model';
import { User } from 'src/models/user.model';
import { OrderProductAssociations } from 'src/models/order_product_associations.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Shop,
      Product,
      ProductUnit,
      ProductImage,
      User,
      OrderProductAssociations,
      Order,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
