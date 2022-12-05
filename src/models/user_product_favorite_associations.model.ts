import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { User } from './user.model';

/**
 * 用户-产品 收藏 关系 多对多
 */
@Table({
  tableName: 'user_product_favorite_associations',
})
export class UserProductFavoriteAssociations extends Model<UserProductFavoriteAssociations> {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;
}
