import { Technician } from 'src/models/technician.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TechnicianService {
  constructor(
    @InjectModel(Technician)
    private technicianModel: typeof Technician,
  ) {}
  async create({ data }) {
    try {
      return await this.technicianModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async findAll({ where }) {
    try {
      return await this.technicianModel.findAll({ where });
    } catch (error) {
      throw error;
    }
  }

  async remove({ where }) {
    try {
      return await this.technicianModel.destroy({ where });
    } catch (error) {
      throw error;
    }
  }
}
