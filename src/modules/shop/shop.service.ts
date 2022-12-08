import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { WhereOptions } from 'sequelize';
import apis from 'src/config/apis';
import { Shop } from 'src/models/shop.model';
import { User } from 'src/models/user.model';
import { CreateDto } from './dto/create.dto';
import { Technician } from 'src/models/technician.model';
import { ShopAddress } from 'src/models/shop_address.model';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Shop)
    private shopModel: typeof Shop,
  ) {}

  // 创建店铺
  async create(option: { user_id: number; data: CreateDto }) {
    try {
      const user = await this.userModel.findOne({
        where: { id: option.user_id },
      });

      if (!user) throw { message: '用户不存在' };

      const hasName = await this.shopModel.count({
        where: {
          name: option.data.name,
        },
      });
      if (hasName > 0) throw { message: '店铺名称已存在，不能使用' };

      // 获取地址经纬度
      const country = option.data.address_info.country || '中国';
      console.log(
        country +
          option.data.address_info.province +
          option.data.address_info.city +
          option.data.address_info.district +
          option.data.address_info.detail_address,
      );

      const locationResult = await apis.geocode.geo({
        address:
          country +
          option.data.address_info.province +
          option.data.address_info.city +
          option.data.address_info.district +
          option.data.address_info.detail_address,
      });
      if (locationResult.status === '0')
        throw {
          message: '地址不存在或填写错误',
        };

      const ADDRESS_INFO = locationResult.geocodes[0];
      const location: string = ADDRESS_INFO.location;
      const ad_code: string = ADDRESS_INFO.adcode;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { address_info, ...formData } = option.data;

      const shop = await this.shopModel.create({
        ...formData,
        boss_id: user.id,
      });
      await shop.$create('address_info', {
        ...option.data.address_info,
        location,
        ad_code,
        country: ADDRESS_INFO.country,
        house_number:
          typeof ADDRESS_INFO.number === 'string' &&
          ADDRESS_INFO.number.length > 0
            ? ADDRESS_INFO.number
            : '',
      });
      return {
        id: shop.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async lists({ user_id, page_size = 20, page_index = 1, status = 1 }) {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);

      const user = await this.userModel.findOne({ where: { id: user_id } });
      const lists = await user.$get('shops', {
        limit: pageSize,
        offset: pageIndex,
        include: [
          {
            model: ShopAddress,
          },
        ],
        where: {
          status,
        },
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*)
                FROM user_shop_follow_associations
                WHERE
                user_shop_follow_associations.shop_id = shop.id
            )`),
              'fans_count',
            ],
            [
              sequelize.literal(`(
                SELECT COUNT(*)
                FROM product
                WHERE
                product.shop_id = shop.id
            )`),
              'product_count',
            ],
          ],
        },
      });
      const count = await user.$count('shops', {
        where: {
          status,
        },
      });
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

  // 关注店铺
  async followShop({ user_id, shop_id }) {
    try {
      const user = await this.userModel.findOne({ where: { id: user_id } });
      if (!user) throw { message: '用户不存在' };
      const shop = await this.shopModel.findOne({
        where: {
          id: shop_id,
        },
      });
      if (!shop) throw { message: '店铺不存在' };
      return await shop.$add('fans', user);
    } catch (error) {
      throw error;
    }
  }

  // 店铺详情
  async detail(option: { shop_id: string }) {
    try {
      return await this.shopModel.findOne({
        where: { id: option.shop_id },
        include: [
          {
            model: ShopAddress,
          },
          {
            model: User,
            as: 'boss',
          },
          {
            model: Technician,
          },
        ],
        attributes: {
          include: [
            [
              sequelize.literal(`(
              SELECT COUNT(*)
              FROM user_shop_follow_associations
              WHERE
              user_shop_follow_associations.shop_id = shop.id
          )`),
              'fans_count',
            ],
            [
              sequelize.literal(`(
              SELECT COUNT(*)
              FROM product
              WHERE
              product.shop_id = shop.id
          )`),
              'product_count',
            ],
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async setStatus(option: { status: number; where: WhereOptions }) {
    try {
      return await this.shopModel.update(
        { status: option.status },
        { where: option.where },
      );
    } catch (error) {
      throw error;
    }
  }
}
