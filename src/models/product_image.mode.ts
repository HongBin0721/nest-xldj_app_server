import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table({
  // timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
  tableName: 'product_image',
  timestamps: true,
})
export class ProductImage extends Model<ProductImage> {
  @Column({
    unique: 'nameIndex',
  })
  url: string;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;
}
