import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { User } from './user.model';

/**
 * 用户产品浏览关系 多对多
 */

@Table({
  tableName: 'user_product_browse_associations',
})
export class UserProductBrowseAssociations extends Model<UserProductBrowseAssociations> {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;
}
