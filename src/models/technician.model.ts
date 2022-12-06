import { Shop } from './shop.model';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import regular from '../utils/regular';
import { Order } from './order.model';

@Table({
  tableName: 'technician',
  comment: '技师/服务人员',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Technician extends Model<Technician> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;

  @Column({
    validate: {
      isUrl: true,
    },
  })
  avatar_url: string;

  @Column({
    validate: {
      isUrl: true,
    },
    comment: '证书图片',
  })
  certificate_img_url: string;

  @Column({
    comment: '手机号',
    validate: {
      isPhone(value) {
        if (!regular.isPhone(value)) {
          throw new Error('手机号格式不正确');
        }
      },
    },
  })
  phone: string;

  @Column({
    comment: '简介',
  })
  about: string;

  @Column({
    comment: '总体评分 最高5分',
    validate: {
      max: 5,
      min: 1,
      isNumeric: true,
    },
    defaultValue: 2,
  })
  score: number;

  @Column({
    comment: '态度 最高5分',
    validate: {
      max: 5,
      min: 1,
      isNumeric: true,
    },
    defaultValue: 2,
  })
  manner_score: number;

  @Column({
    comment: '手法 最高5分',
    validate: {
      max: 5,
      min: 1,
      isNumeric: true,
    },
    defaultValue: 2,
  })
  skill_score: number;

  @Column({
    comment: '颜值/形象 最高5分',
    validate: {
      max: 5,
      min: 1,
      isNumeric: true,
    },
    defaultValue: 2,
  })
  figure_score: number;

  @ForeignKey(() => Shop)
  @Column({
    comment: '店铺ID',
  })
  shop_id: number;
  @BelongsTo(() => Shop)
  shop: Shop;

  @HasMany(() => Order)
  order: Order[];
}
