import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  // timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
  tableName: 'user_login',
})
export class UserLogin extends Model<UserLogin> {
  @CreatedAt
  login_time: Date;

  @Column
  login_ip: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
