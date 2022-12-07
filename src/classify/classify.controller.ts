import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/controller/auth/guards/jwt-auth.guard';
import { ClassifyService } from './classify.service';
import { CreateDto } from './dto/create.dto';
import { ListsDto } from './dto/lists.dto';

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/lists')
  async lists(@Query() query: ListsDto, @Request() req): Promise<object> {
    try {
      return await this.classifyService.lists({
        is_tree: query.is_tree != null ? Number(query.is_tree) : null,
        parent_id: query.parent_id != null ? Number(query.parent_id) : null,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() body: CreateDto, @Request() req) {
    try {
      return await this.classifyService.create({
        data: body,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
