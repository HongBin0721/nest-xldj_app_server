import { Shop } from 'src/models/shop.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Technician } from 'src/models/technician.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Shop, Technician])],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
