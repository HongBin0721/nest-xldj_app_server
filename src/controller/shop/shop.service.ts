import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Shop } from 'src/models/shop.model';
import { User } from 'src/models/user.model';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Shop)
    private shopModel: typeof Shop,
  ) {}

  // 创建店铺
  async create({ user_id, data }) {
    try {
      const user = await this.userModel.findOne({ where: { id: user_id } });

      if (!user) throw { message: '用户不存在' };

      const hasName = await this.shopModel.count({
        where: {
          name: data.name,
        },
      });
      if (hasName > 0) throw { message: '店铺名称已存在，不能使用' };

      return await this.shopModel.create({
        ...data,
        boss_id: user.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async lists({ user_id, page_size = 20, page_index = 1 }) {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);

      const user = await this.userModel.findOne({ where: { id: user_id } });
      const lists = await user.$get('shops', {
        limit: pageSize,
        offset: pageIndex,
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
      const count = await user.$count('shops');
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
          boss_id: {
            [Op.ne]: user_id,
          },
        },
      });
      if (!shop) throw { message: '店铺不存在' };
      return await shop.$add('fans', user);
    } catch (error) {
      throw error;
    }
  }
}
