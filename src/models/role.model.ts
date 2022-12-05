import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';

import { User } from './user.model';
import { UserRoleAssociations } from './user_role_associations.model';

@Table({
  tableName: 'role',
  timestamps: false, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Role extends Model<Role> {
  @Column({
    unique: 'nameIndex',
  })
  name: string;

  @BelongsToMany(() => User, () => UserRoleAssociations)
  users: User[];
}
