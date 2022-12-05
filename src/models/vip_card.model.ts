import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from './user.model';

@Table({
  tableName: 'vip_card',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class VipCard extends Model<VipCard> {
  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '总金额',
    defaultValue: '0.00',
  })
  balance: string;

  @Column({
    comment: '类型：1:普通会员卡',
    defaultValue: 1,
  })
  type: number;

  @ForeignKey(() => User)
  @Column({})
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
