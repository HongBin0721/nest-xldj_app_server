import { Order } from './order.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

/**
 * 订单状态表
 */
@Table({
  tableName: 'payment_method',
  timestamps: false,
})
export class PaymentMethod extends Model<PaymentMethod> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;

  // 状态（一对多）
  @HasMany(() => Order)
  orders: Order[];
}
