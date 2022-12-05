import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { ProductTypeAssociations } from './product_type_associations.model';

@Table({
  // timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
  tableName: 'product_type',
  timestamps: true,
})
export class ProductType extends Model<ProductType> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;

  // 类型可以有多个产品
  @BelongsToMany(() => Product, () => ProductTypeAssociations)
  product: Product[];
}
