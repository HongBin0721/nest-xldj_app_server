import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { User } from './user.model';

/**
 * 用户产品购买关系 多对多
 */

@Table({
  tableName: 'user_product_buy_associations',
})
export class UserProductBuyAssociations extends Model<UserProductBuyAssociations> {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;
}
