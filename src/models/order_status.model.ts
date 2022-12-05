import { Column, Model, Table } from 'sequelize-typescript';

/**
 * 订单状态表
 */
@Table({
  tableName: 'order_status',
  timestamps: false,
})
export class OrderStatus extends Model<OrderStatus> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;
}
