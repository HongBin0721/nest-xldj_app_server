import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technician } from 'src/models/technician.model';
import { TechnicianController } from './technician.controller';
import { TechnicianService } from './technician.service';

@Module({
  imports: [SequelizeModule.forFeature([Technician])],
  controllers: [TechnicianController],
  providers: [TechnicianService],
  exports: [TechnicianService],
})
export class TechnicianModule {}
