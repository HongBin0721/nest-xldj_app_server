import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async getRoles() {
    try {
      const lists = await this.roleModel.findAll({
        include: [User],
      });

      return lists;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async addRole(appBody) {
    try {
      const count = await this.roleModel.count({
        where: { name: appBody.name },
      });
      if (count > 0) throw new HttpException('该角色名称已经存在', 400);
      const res = await this.roleModel.create(appBody);
      return res;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
