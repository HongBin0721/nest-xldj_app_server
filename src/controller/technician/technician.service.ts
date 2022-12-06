import { ShopAddress } from './../../models/shop_address.model';
import { Shop } from 'src/models/shop.model';
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
      return await this.technicianModel.findAll({
        where,
        include: [
          {
            model: Shop,
            include: [
              {
                model: ShopAddress,
              },
            ],
          },
        ],
      });
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

  async detail(opstion: { technician_id: string }) {
    try {
      return await this.technicianModel.findOne({
        where: { id: opstion.technician_id },
        include: [
          {
            model: Shop,
            include: [
              {
                model: ShopAddress,
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}
