import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { ListsDto } from './dto/lists.dto';
import { RemoveDto } from './dto/remove.dto';
import { TechnicianService } from './technician.service';

@Controller('technician')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() appBody: CreateDto, @Request() req): Promise<object> {
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
  async lists(@Query() query: ListsDto, @Request() req): Promise<object> {
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
  async remove(@Body() appBody: RemoveDto, @Request() req): Promise<object> {
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
}
