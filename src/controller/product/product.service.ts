import { Product } from 'src/models/product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductUnit } from 'src/models/product_unit.model';
import { Shop } from 'src/models/shop.model';
import { ProductImage } from 'src/models/product_image.mode';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/models/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Shop)
    private shopModel: typeof Shop,
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(ProductUnit)
    private productUnitModel: typeof ProductUnit,
    @InjectModel(ProductImage)
    private productImageModel: typeof ProductImage,
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async lists({ shop_id, page_size = 20, page_index = 1 }) {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);

      interface WhereParams {
        shop_id?: number;
      }
      const where: WhereParams = {};
      if (shop_id != null) where.shop_id = shop_id;

      const { rows, count } = await this.productModel.findAndCountAll({
        limit: pageSize,
        offset: pageIndex,
        where: {
          ...where,
        },
        include: [ProductImage, ProductUnit],
        attributes: {
          include: [
            [
              this.sequelize.literal(`(
                SELECT COUNT(*)
                FROM user_product_browse_associations
                WHERE
                user_product_browse_associations.product_id = product.id
            )`),
              'browse_users_count',
            ],
            [
              this.sequelize.literal(`(
                SELECT COUNT(*)
                FROM user_product_favorite_associations
                WHERE
                user_product_favorite_associations.product_id = product.id
            )`),
              'favorite_users_count',
            ],
          ],
        },
      });
      return {
        lists: rows,
        total: count,
        page_size: pageSize,
        page_index: page_index,
      };
    } catch (error) {
      throw error;
    }
  }

  async create({ data }) {
    try {
      return await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        if (Number(data.old_price) < Number(data.price))
          throw { message: '现价不能大于原价' };
        const hasShop = await this.shopModel.count({
          where: { id: data.shop_id },
        });
        if (hasShop === 0) throw { message: '店铺不存在' };

        const product = await (
          await this.productModel.create(data, transactionHost)
        ).toJSON();
        console.log(product);

        const imgArr = data.imgs.map((item) => {
          return {
            url: item,
            product_id: product.id,
          };
        });
        console.log(imgArr);

        await this.productImageModel.bulkCreate(imgArr, {
          validate: true,
          ...transactionHost,
        });

        return { id: product.id };
      });
    } catch (error) {
      throw error;
    }
  }

  async unitCreate({ data }) {
    return await this.productUnitModel.create(data);
    try {
    } catch (error) {
      throw error;
    }
  }

  async getUnit() {
    try {
      const unit = this.productUnitModel.findAll();
      return unit;
    } catch (error) {
      throw error;
    }
  }

  // 收藏产品
  async favorite({ user_id, product_id }) {
    try {
      const user = await this.userModel.findOne({ where: { id: user_id } });
      const product = await this.productModel.findOne({
        where: { id: product_id },
      });

      return await product.$add('favorite_users', user);
    } catch (error) {
      throw error;
    }
  }
  // 取消收藏产品
  async cancelFavorite({ user_id, product_id }) {
    try {
      const user = await this.userModel.findOne({ where: { id: user_id } });
      const product = await this.productModel.findOne({
        where: { id: product_id },
      });
      return await product.$remove('favorite_users', user);
    } catch (error) {
      throw error;
    }
  }

  // 详情
  async getDetail({ product_id }) {
    try {
      return await this.productModel.findOne({
        where: { id: product_id },
        include: [ProductImage, ProductUnit],
        attributes: {
          include: [
            [
              this.sequelize.literal(`(
                SELECT COUNT(*)
                FROM user_product_browse_associations
                WHERE
                user_product_browse_associations.product_id = product.id
            )`),
              'browse_users_count',
            ],
            [
              this.sequelize.literal(`(
                SELECT COUNT(*)
                FROM user_product_favorite_associations
                WHERE
                user_product_favorite_associations.product_id = product.id
            )`),
              'favorite_users_count',
            ],
            // [
            //   this.sequelize.literal(`(
            //     SELECT name
            //     FROM product_unit
            //     WHERE
            //     product_unit.id = product.unit_id
            // )`),
            //   'unit',
            // ],
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
