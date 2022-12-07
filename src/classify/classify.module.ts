import { Classify } from './../models/classify.model';
import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Classify])],
  providers: [ClassifyService],
  controllers: [ClassifyController],
})
export class ClassifyModule {}
