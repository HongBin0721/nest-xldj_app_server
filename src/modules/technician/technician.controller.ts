import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpException,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { DetailDto } from './dto/detail.dto';
import { ListsDto } from './dto/lists.dto';
import { RemoveDto } from './dto/remove.dto';
import { TechnicianService } from './technician.service';

@Controller('technician')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() appBody: CreateDto): Promise<object> {
    try {
      return await this.technicianService.create({
        data: appBody,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('lists')
  async lists(@Query() query: ListsDto): Promise<object> {
    try {
      return await this.technicianService.findAll({
        where: {
          shop_id: query.shop_id,
        },
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  async remove(@Body() appBody: RemoveDto): Promise<object> {
    try {
      return {
        id: await this.technicianService.remove({
          where: {
            id: appBody.technician_id,
          },
        }),
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  async detail(@Query() query: DetailDto): Promise<object> {
    try {
      return await this.technicianService.detail({
        technician_id: query.technician_id,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
