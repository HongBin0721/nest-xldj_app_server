import { Address } from 'src/models/address.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { User } from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
