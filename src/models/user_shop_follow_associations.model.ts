import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Shop } from './shop.model';
import { User } from './user.model';

/**
 * 用户店铺关注 关系 多对多
 */
@Table({
  tableName: 'user_shop_follow_associations',
})
export class UserShopFollowAssociations extends Model<UserShopFollowAssociations> {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Shop)
  @Column
  shop_id: number;
}
