import { OrderProductAssociations } from './order_product_associations.model';
import { ProductImage } from './product_image.mode';
import { ProductUnit } from './product_unit.model';
import {
  BelongsToMany,
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductType } from './product_type.model';
import { Shop } from './shop.model';

import { User } from './user.model';
import { UserProductBuyAssociations } from './user_product_buy_associations';
import { UserProductBrowseAssociations } from './user_product_browse_associations.model';
import { ProductTypeAssociations } from './product_type_associations.model';
import { UserProductFavoriteAssociations } from './user_product_favorite_associations.model';
import { Order } from './order.model';
import { Classify } from './classify.model';

@Table({
  tableName: 'product',
  paranoid: true, // 逻辑删除
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Product extends Model<Product> {
  @Column
  title: string;

  @Column
  describe: string;

  @Column
  use_time: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  price: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  old_price: string;

  @Column({
    comment: '详情',
  })
  detail: string;

  @Column({
    comment: '封面图',
  })
  cover_pic: string;

  @ForeignKey(() => ProductUnit)
  @Column({
    comment: '单位',
  })
  unit_id: number;
  @BelongsTo(() => ProductUnit)
  unit: ProductUnit;

  // 出售 可以被多个用户购买（多对多）
  @BelongsToMany(() => User, () => UserProductBuyAssociations)
  sell_lists: User[];

  // 浏览 可以被多个用户浏览（多对多）
  @BelongsToMany(() => User, () => UserProductBrowseAssociations)
  browse_users: User[];

  // 收藏 可以被多个用户收藏（多对多）
  @BelongsToMany(() => User, () => UserProductFavoriteAssociations)
  favorite_users: User[];

  // 类型-产品可以有多个类型（多对多）
  @BelongsToMany(() => ProductType, () => ProductTypeAssociations)
  type: ProductType[];

  // 类型（一对多）
  @HasMany(() => ProductImage)
  imgs: ProductImage[];

  // 店铺 多对一
  @ForeignKey(() => Shop)
  @Column({})
  shop_id: number;
  @BelongsTo(() => Shop)
  shop: Shop;

  // 产品与订单的关系 多对多
  @BelongsToMany(() => Order, () => OrderProductAssociations)
  orders: Order[];

  // 分类
  @ForeignKey(() => Classify)
  @Column({
    comment: '分类ID',
    allowNull: false,
  })
  classify_id: number;
  @BelongsTo(() => Classify)
  classify: Classify;
}
