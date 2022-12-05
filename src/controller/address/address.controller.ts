import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateDto } from './dto/create.dto';
import { DeleteAddressDto } from './dto/delete.dto';
import { ListsDto } from './dto/lists.dto';
import { SetDefaultAddressDto } from './dto/set_default_address.dto';
import { UpdateAddressDto } from './dto/update.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/lists')
  async lists(@Body() body: ListsDto, @Request() req) {
    try {
      return await this.addressService.lists({ ...body, user_id: req.user.id });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() body: CreateDto, @Request() req) {
    try {
      return await this.addressService.create({
        data: body,
        user_id: req.user.id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/setDefault')
  async setDefault(@Body() body: SetDefaultAddressDto, @Request() req) {
    try {
      return await this.addressService.setDefaultAddress({
        address_id: body.address_id,
        user_id: req.user.id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async update(@Body() body: UpdateAddressDto, @Request() req) {
    try {
      return await this.addressService.update({
        data: body,
        user_id: req.user.id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async delete(@Body() body: DeleteAddressDto) {
    try {
      return await this.addressService.delete({
        address_id: body.address_id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
