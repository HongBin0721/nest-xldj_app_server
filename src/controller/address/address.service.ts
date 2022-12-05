import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Address } from 'src/models/address.model';
import { User } from 'src/models/user.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private addressModel: typeof Address,
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}
  async lists({ user_id, page_index, page_size }) {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);
      const user = await this.userModel.findOne({ where: { id: user_id } });
      const lists = await user.$get('address', {
        limit: pageSize,
        offset: pageIndex,
        order: [[this.sequelize.literal('is_default'), 'DESC']],
      });
      const count = await user.$count('address');
      return {
        lists,
        total: count,
        page_size: pageSize,
        page_index: page_index,
      };
    } catch (error) {
      throw error;
    }
  }

  async create({ data, user_id }) {
    try {
      if (data.is_default) {
        await this.addressModel.update(
          { is_default: false },
          { where: { user_id: user_id } },
        );
      }
      const user = await this.userModel.findOne({ where: { id: user_id } });
      return await user.$create('address', data);
    } catch (error) {
      throw error;
    }
  }

  // 设置默认地址
  async setDefaultAddress({ address_id, user_id }) {
    try {
      await this.addressModel.update(
        { is_default: false },
        { where: { id: { [Op.ne]: address_id }, user_id: user_id } },
      );
      return await this.addressModel.update(
        { is_default: true },
        { where: { id: address_id, user_id: user_id } },
      );
    } catch (error) {
      throw error;
    }
  }

  // 编辑地址
  async update({ data, user_id }) {
    try {
      if (data.is_default) {
        await this.addressModel.update(
          { is_default: false },
          { where: { user_id: user_id } },
        );
      }
      return await this.addressModel.update(data, { where: { id: data.id } });
    } catch (error) {
      throw error;
    }
  }

  // 编辑地址
  async delete({ address_id }) {
    try {
      return await this.addressModel.destroy({ where: { id: address_id } });
    } catch (error) {
      throw error;
    }
  }
}
