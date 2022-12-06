import { Technician } from 'src/models/technician.model';
import { ShopAddress } from './../../models/shop_address.model';
import { Shop } from 'src/models/shop.model';
import { ProductImage } from 'src/models/product_image.mode';
import { OrderStatus } from './../../models/order_status.model';
import { Order } from './../../models/order.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron } from '@nestjs/schedule';
import { Address } from 'src/models/address.model';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';
import { ProductUnit } from 'src/models/product_unit.model';
import methods from '../../utils/methods';
import apis from 'src/config/apis';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderStatus)
    private orderStatusModel: typeof OrderStatus,
    @InjectModel(Address)
    private addressModel: typeof Address,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(Shop)
    private shopModel: typeof Shop,
    @InjectModel(Technician)
    private technicianModel: typeof Technician,
  ) {}

  async lists({ status, page_size = 20, page_index = 1 }) {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);

      interface WhereParams {
        status?: number;
      }
      const where: WhereParams = {};
      if (status != 0) where.status = status;

      const { rows, count } = await this.orderModel.findAndCountAll({
        limit: pageSize,
        offset: pageIndex,
        where: {
          ...where,
        },
        include: [Address, Technician],
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

  async detail({ order_no }) {
    try {
      return await this.orderModel.findOne({
        where: { order_no },
        include: [Technician, Address],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOrderStatusLists() {
    try {
      return await this.orderStatusModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async orderStatusCreate({ data }) {
    try {
      return await this.orderStatusModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  // 确认订单
  async orderConfirm({ data, user_id }) {
    try {
      // const user = await this.userModel.findOne({ where: { id: user_id } });
      const address = await this.addressModel.findOne({
        where: {
          user_id: user_id,
          is_default: true,
        },
      });
      console.log(address);

      if (!address)
        throw {
          message: '下单前请完善你的地址',
        };

      const constJson = {};
      data.products.forEach((item) => {
        constJson[`${item.product_id}`] = item.count;
      });
      console.log(constJson);

      // 获取产品id
      const pid = data.products.map((item) => {
        return item.product_id;
      });
      const products = await this.productModel.findAll({
        where: { id: pid },
        include: [ProductUnit, ProductImage, Shop],
      });
      // console.log(products);

      const shop = await this.shopModel.findOne({
        where: {
          id: products[0].shop_id,
        },
        include: [ShopAddress],
      });
      // console.log(shop);

      const sumArr: number[] = [];

      const shopLocation: string = shop.toJSON().address_info.location;

      const userLocation: string = address.toJSON().location;

      console.log('商家坐标：', shopLocation);
      console.log('用户坐标：', userLocation);

      const directionWalkingResult = await apis.distance.index({
        origins: shop.toJSON().address_info.location,
        destination: address.toJSON().location,
        type: '1',
      });
      console.log(directionWalkingResult);
      if (directionWalkingResult.status === '0')
        throw {
          message: '距离测算失败，检查地址是否正确？',
        };

      // 距离（米）
      const distance: string = directionWalkingResult.results[0].distance;
      // 时间（分）
      const minute: number =
        Number(directionWalkingResult.results[0].duration) / 60;
      console.log('时间：分 => ', minute);

      // 价格 = 时间（分） / 2
      const car_fare = minute / 2;

      // 获取技师列表
      const technicians = await this.technicianFindAll({
        where: {
          shop_id: products[0].shop_id,
        },
      });

      return {
        address: address,
        technicians,
        products: products.map((item) => {
          sumArr.push(Number(item['dataValues'].price) * constJson[item.id]);
          return {
            ...item['dataValues'],
            count: constJson[item.id],
            product_total_amount: (
              Number(item['dataValues'].price) * constJson[item.id]
            ).toFixed(2),
          };
        }),
        car_fare: car_fare.toFixed(2).toString(),
        distance, // 距离（米）
        expected_driving_time: parseInt(minute.toString()).toString(), // 预计行驶时间（分）
        order_total_amount: methods
          .sum([...sumArr, car_fare])
          .toFixed(2)
          .toString(), // 总价
        order_actual_amount: methods
          .sum([...sumArr, car_fare])
          .toFixed(2)
          .toString(), // 实际价格
      };
    } catch (error) {
      throw error;
    }
  }

  // 创建订单
  async createOrder(data, user_id: number) {
    try {
      const result = await this.orderModel.create({
        ...data,
        user_id: user_id,
        order_no: this.createOrderCode() + '',
        status: Number(data.actual_amount) === 0 ? 2 : 1, // 默认待付款
        address_id: data.address_id,
      });
      return {
        order_no: result.toJSON().order_no,
        order_id: result.toJSON().id,
        createdAt: result.toJSON().createdAt,
      };
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder({ order_no }) {
    try {
      console.log(order_no);

      const res = await this.orderModel.update(
        { status: 4 },
        { where: { order_no } },
      );
      console.log(res);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async technicianFindAll({ where }) {
    try {
      return await this.technicianModel.findAll({ where });
    } catch (error) {
      throw error;
    }
  }

  // 生成订单号
  createOrderCode() {
    let orderCode = '';
    for (let i = 0; i < 6; i++) {
      orderCode += Math.floor(Math.random() * 10);
    }
    orderCode = new Date().getTime() + orderCode; //时间戳，用来生成订单号。
    console.log(orderCode);
    return orderCode;
  }

  @Cron('45 * * * * *')
  handleCron() {
    console.log('定期执行定时器 45秒');
  }
}
