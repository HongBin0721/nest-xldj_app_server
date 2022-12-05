import { Product } from 'src/models/product.model';
import { ProductType } from './product_type.model';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

/**
 * 产品类型 关系 多对多
 */
@Table({
  tableName: 'product_type_associations',
})
export class ProductTypeAssociations extends Model<ProductTypeAssociations> {
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => ProductType)
  @Column
  type_id: number;
}
