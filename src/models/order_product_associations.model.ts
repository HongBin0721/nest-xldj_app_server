import { Product } from 'src/models/product.model';
import { Order } from './order.model';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'order_product_associations',
})
export class OrderProductAssociations extends Model<OrderProductAssociations> {
  @ForeignKey(() => Order)
  @Column
  order_id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;
}
