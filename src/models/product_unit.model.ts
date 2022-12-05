import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';

@Table({
  // timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
  tableName: 'product_unit',
  timestamps: true,
})
export class ProductUnit extends Model<ProductUnit> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;

  // 类型（一对多）
  @HasMany(() => Product)
  products: Product[];
}
