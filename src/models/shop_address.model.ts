import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Shop } from './shop.model';

@Table({
  tableName: 'shop_address',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class ShopAddress extends Model<ShopAddress> {
  @Column({
    comment: '国家',
  })
  country: string;

  @Column({
    comment: '省份',
  })
  province: string;

  @Column({
    comment: '城市',
  })
  city: string;

  @Column({
    comment: '区域',
  })
  district: string;

  @Column
  get address(): string {
    return (
      this.getDataValue('country') +
      this.getDataValue('province') +
      this.getDataValue('city') +
      this.getDataValue('district') +
      this.getDataValue('detail_address')
    );
  }

  @Column({
    comment: '详细地址',
  })
  detail_address: string;

  @Column({
    comment: '门牌号',
  })
  house_number: string;

  @Column
  contact_name: string;

  @Column
  phone: string;

  @Column({
    comment: '行政区ID',
    allowNull: false,
  })
  ad_code: number;

  @Column({
    comment: '地址经纬度',
  })
  location: string;

  @ForeignKey(() => Shop)
  @Column({
    comment: '店铺id',
  })
  shop_id: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}
