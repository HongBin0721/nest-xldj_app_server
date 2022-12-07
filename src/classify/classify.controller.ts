import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/controller/auth/guards/jwt-auth.guard';
import { ClassifyService } from './classify.service';
import { CreateDto } from './dto/create.dto';
import { ListsDto } from './dto/lists.dto';
import { RemoveDto } from './dto/remove.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/lists')
  async lists(@Query() query: ListsDto): Promise<object> {
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
  async create(@Body() body: CreateDto) {
    try {
      return await this.classifyService.create({
        data: body,
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async update(@Body() body: UpdateDto) {
    try {
      return await this.classifyService.update({
        where: { id: body.id },
        data: {
          name: body.name,
          icon_url: body.icon_url,
          info: body.info,
          parent_id: body.parent_id,
        },
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  async remove(@Body() body: RemoveDto) {
    try {
      return await this.classifyService.remove({
        where: { id: body.id },
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
