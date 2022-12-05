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
  @Column({})
  address: string;

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
