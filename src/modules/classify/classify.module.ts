import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Classify } from 'src/models/classify.model';

@Module({
  imports: [SequelizeModule.forFeature([Classify])],
  providers: [ClassifyService],
  controllers: [ClassifyController],
})
export class ClassifyModule {}
