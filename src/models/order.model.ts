import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { OrderProductAssociations } from './order_product_associations.model';
import { OrderStatus } from './order_status.model';
import { PaymentMethod } from './payment_method.model';
import { Product } from './product.model';
import { Technician } from './technician.model';

import { User } from './user.model';

@Table({
  tableName: 'orders',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Order extends Model<Order> {
  @Column({
    unique: 'order_noIndex',
  })
  order_no: string;

  @Column({
    comment: '1:待付款 2:进行中 3:已完成 4:已取消 5:待评价',
  })
  status: number;

  @ForeignKey(() => PaymentMethod)
  @Column
  payment_method_id: number;
  @BelongsTo(() => PaymentMethod)
  payment_method: PaymentMethod;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '总金额',
    allowNull: false,
  })
  total_amount: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '实际金额',
    allowNull: false,
  })
  actual_amount: string;

  @Column
  remark: string;

  @Column({
    comment: '服务时间段',
  })
  service_time_period: string;

  @Column({
    type: DataType.STRING(10000),
  })
  get products(): string {
    return JSON.parse(this.getDataValue('products'));
  }
  set products(value: string) {
    this.setDataValue('products', JSON.stringify(value));
  }

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '交通费',
    allowNull: false,
  })
  car_fare: string;

  @Column({
    comment: '距离（米）',
    validate: {
      isNumeric: true,
    },
  })
  distance: string;

  @Column({
    comment: '行驶时间（米）',
    validate: {
      isNumeric: true,
    },
  })
  expected_driving_time: string;

  @ForeignKey(() => Technician)
  @Column({
    comment: '服务人员',
  })
  technician_id: number;
  @BelongsTo(() => Technician)
  technician: Technician;

  @ForeignKey(() => User)
  @Column({})
  user_id: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Address)
  @Column({})
  address_id: number;
  @BelongsTo(() => Address)
  address: Address;

  // 订单与产品的关系 多对多
  // @BelongsToMany(() => Product, () => OrderProductAssociations)
  // products: Product[];
}
