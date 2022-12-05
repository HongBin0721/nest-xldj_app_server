import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './role.model';
import { User } from './user.model';

@Table({
  tableName: 'user_role_associations',
})
export class UserRoleAssociations extends Model<UserRoleAssociations> {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Role)
  @Column
  role_id: number;
}
