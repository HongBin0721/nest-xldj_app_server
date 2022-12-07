import { Product } from 'src/models/product.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'classify',
  comment: '产品分类',
})
export class Classify extends Model<Classify> {
  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    comment: '信息',
    defaultValue: '',
  })
  info: string;

  @Column({
    comment: '图标链接',
    validate: {
      isUrl: true,
    },
  })
  icon_url: string;

  @Column({
    comment: '父级ID null表示根节点',
  })
  parent_id: number;

  @HasMany(() => Product)
  products: Product[];
}
