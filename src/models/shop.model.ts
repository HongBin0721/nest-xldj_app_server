import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Technician } from './technician.model';
import { User } from './user.model';
import { UserShopFollowAssociations } from './user_shop_follow_associations.model';

@Table({
  tableName: 'shop',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Shop extends Model<Shop> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;

  @Column({})
  company: string;

  @Column({
    validate: {
      isUrl: true,
    },
    comment: '营业执照图片',
  })
  license_img_url: string;

  @Column({
    comment: '营业时间',
  })
  business_time: string;

  @Column({
    comment: '简介',
  })
  introduce: string;

  @Column({
    comment: '地址',
  })
  address: string;

  @Column({
    comment: '详细地址',
  })
  detail_address: string;

  @Column({
    comment: '封面图',
  })
  cover_pic: string;

  // 产品（一对多）
  @HasMany(() => Product)
  products: Product[];

  // 店铺被关注
  @BelongsToMany(() => User, () => UserShopFollowAssociations)
  fans: User[];

  @ForeignKey(() => User)
  @Column({
    comment: '老板',
  })
  boss_id: number;

  @BelongsTo(() => User)
  boss: User;

  // 技师（一对多）
  @HasMany(() => Technician)
  technician: Technician[];
}
