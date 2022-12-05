import { VipCard } from './vip_card.model';
import { Order } from './order.model';
import { UserShopFollowAssociations } from './user_shop_follow_associations.model';
import {
  Column,
  Model,
  Table,
  BelongsToMany,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { UserRoleAssociations } from './user_role_associations.model';
import * as bcrypt from 'bcrypt';
import { UserLogin } from './user_login.model';
import { Product } from './product.model';
import { UserProductBuyAssociations } from './user_product_buy_associations';
import { Shop } from './shop.model';
import { UserProductBrowseAssociations } from './user_product_browse_associations.model';
import { UserProductFavoriteAssociations } from './user_product_favorite_associations.model';
import { Address } from './address.model';

@Table({
  tableName: 'user',
  paranoid: true, // 逻辑删除
  underscored: true, // 以 _ 线命名字段
  createdAt: 'created_at',
  defaultScope: {
    attributes: {
      // 排除密码，不返回密码
      exclude: ['password'],
    },
  },
})
class User extends Model<User> {
  @Column
  nickname: string;

  @Column
  get password(): string {
    return this.getDataValue('password');
  }

  set password(value: string) {
    const saltOrRounds = 10;
    const password = value;
    const hash = bcrypt.hashSync(password, saltOrRounds);
    this.setDataValue('password', hash);
  }

  @Column({
    unique: 'telIndex',
  })
  tel: string;

  @Column({
    unique: 'emailIndex',
  })
  email: string;

  @Column({
    defaultValue: 2,
  })
  age: number;

  @Column
  avatar_url: string;

  // @CreatedAt
  // createdAt: Date;

  // @UpdatedAt
  // updated_at: Date;

  @BelongsToMany(() => Role, () => UserRoleAssociations)
  roles: Role[];

  @HasMany(() => UserLogin)
  login_history: UserLogin[];

  // 可以购买多个产品（多对多）
  @BelongsToMany(() => Product, () => UserProductBuyAssociations)
  buy_products: Product[];

  // 可以浏览多个产品（多对多）
  @BelongsToMany(() => Product, () => UserProductBrowseAssociations)
  product_browse: Product[];

  // 可以关注多个店铺（多对多）
  @BelongsToMany(() => Shop, () => UserShopFollowAssociations)
  follow_shop: Shop[];

  // 店铺
  @HasMany(() => Shop)
  shops: Shop[];

  // 可以收藏多个产品（多对多）
  @BelongsToMany(() => Product, () => UserProductFavoriteAssociations)
  product_favorite: Product[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Address)
  address: Address[];

  // 会员卡
  @HasOne(() => VipCard)
  vip_card: VipCard;
}

export { User };
