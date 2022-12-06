import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Order } from './order.model';

import { User } from './user.model';

@Table({
  tableName: 'address',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Address extends Model<Address> {
  @Column({
    comment: '国家',
  })
  country: string;

  @Column({
    comment: '省份',
  })
  province: string;

  @Column({
    comment: '城市',
  })
  city: string;

  @Column({
    comment: '区域',
  })
  district: string;

  @Column
  get address(): string {
    return (
      this.getDataValue('country') +
      this.getDataValue('province') +
      this.getDataValue('city') +
      this.getDataValue('district') +
      this.getDataValue('detail_address')
    );
  }

  @Column({
    comment: '详细地址',
  })
  detail_address: string;

  @Column({
    comment: '门牌号',
  })
  house_number: string;

  @Column
  contact_name: string;

  @Column
  phone: string;

  @Column({
    comment: '行政区ID',
    allowNull: false,
  })
  ad_code: number;

  @Column({
    comment: '地址经纬度',
  })
  location: string;

  @Column({
    comment: '是否是默认地址',
    defaultValue: false,
    type: DataType.BOOLEAN,
    // validate: {
    //   isInt: true,
    //   max: 2,
    //   min: 1,
    // },
  })
  is_default: boolean;

  @ForeignKey(() => User)
  @Column({
    comment: '用户id',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  // 订单（一对多）
  @HasMany(() => Order)
  orders: Order[];
}
