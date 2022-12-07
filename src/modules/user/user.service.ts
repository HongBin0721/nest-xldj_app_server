import * as sequelize from 'sequelize';
import { HttpException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { User } from 'src/models/user.model';
import { Role } from 'src/models/role.model';
import { InjectModel } from '@nestjs/sequelize';
import { Follower } from 'src/models/follower.model';
import { UserLogin } from 'src/models/user_login.model';

interface GetUsersBody {
  lists: User[];
  total: number;
  page_size: number;
  page_index: number;
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Follower)
    private followerModel: typeof Follower,
    @InjectModel(UserLogin)
    private userLoginModel: typeof UserLogin,
  ) {}

  // 获取用户列表
  async getUsers({ page_size = 20, page_index = 1 }): Promise<GetUsersBody> {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);
      const { rows: userList, count: userCount } =
        await this.userModel.findAndCountAll({
          limit: pageSize,
          offset: pageIndex,
          include: [
            {
              model: Role,
            },
          ],
          attributes: {
            include: [
              [
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM shop
                    WHERE
                        shop.boss_id = user.id
                )`),
                'shop_count',
              ],
              [
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_login
                    WHERE
                    user_login.user_id = user.id
                )`),
                'login_history_count',
              ],
              [
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_product_favorite_associations
                    WHERE
                    user_product_favorite_associations.user_id = user.id
                )`),
                'product_favorite_count',
              ],
              [
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_shop_follow_associations
                    WHERE
                    user_shop_follow_associations.user_id = user.id
                )`),
                'follow_shop_count',
              ],
              [
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_product_browse_associations
                    WHERE
                    user_product_browse_associations.user_id = user.id
                )`),
                'product_browse_count',
              ],
            ],
          },
        });

      return {
        lists: userList,
        total: userCount,
        page_size: pageSize,
        page_index: page_index,
      };
    } catch (error) {
      throw error;
    }
  }

  // 添加用户角色
  async addUserRole(uid, rid: Array<number>) {
    try {
      const user = await this.userModel.findOne({ where: { id: uid } });
      if (!user) throw new HttpException('用户ID不存在', 600);

      const role = await this.roleModel.findOne({
        where: { id: Number(rid) },
      });
      if (!role) throw new HttpException('角色ID不存在', 600);

      user.$add('roles', role).then((res) => {
        console.log(res);
      });

      return {
        msg: '添加成功',
      };
    } catch (error) {
      throw new HttpException(error, 600);
    }
  }

  // 查询用户是否存在
  findHasUser(value): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const userCount = await this.userModel.count({
          where: { id: value },
        });
        resolve(userCount > 0);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 关注
  async follow(my_id, follow_id) {
    try {
      const hasUser = await this.findHasUser(follow_id);
      if (!hasUser) throw new HttpException('要关注的用户不存在', 600);

      const count = await this.followerModel.count({
        where: {
          userId: my_id,
          followerId: follow_id,
        },
      });
      if (count > 0) throw new HttpException('已经关注该用户', 600);

      await this.followerModel.create({
        userId: my_id,
        followerId: follow_id,
      });

      return {
        msg: '关注成功',
      };
    } catch (error) {
      throw new HttpException(error, 600);
    }
  }

  // 获取我关注的
  async getMyFollowList({ user_id, page_size = '20', page_index = '1' }) {
    const pageSize = parseInt(page_size);
    const pageIndex = parseInt(page_index) - 1;
    try {
      const follows = await this.followerModel.findAll({
        where: { userId: user_id },
        attributes: ['followerId'],
      });

      const followsId = follows.map((item) => {
        return item.followerId;
      });
      const { rows: userList, count: userCount } =
        await this.userModel.findAndCountAll({
          where: { id: followsId },
          limit: pageSize,
          offset: pageIndex,
        });

      return {
        lists: userList,
        total: userCount,
        page_size: pageSize,
        page_index: parseInt(page_index),
      };
    } catch (error) {
      throw new HttpException(error, 600);
    }
  }

  // 获取跟我互关的人
  async getMutualFollow({ user_id, page_size = '20', page_index = '1' }) {
    const pageSize = parseInt(page_size);
    const pageIndex = parseInt(page_index) - 1;
    try {
      // 我关注的 用户列表
      const myFollow = await this.followerModel.findAll({
        where: { userId: user_id },
        limit: pageSize,
        offset: pageIndex,
        attributes: ['followerId'],
      });

      // 我关注的 用户ID列表
      const myFollowIds = myFollow.map((item) => {
        return item.followerId;
      });

      // 关注我的 用户列表
      const followMy = await this.followerModel.findAll({
        where: { userId: myFollowIds, followerId: user_id },
        limit: pageSize,
        offset: pageIndex,
        attributes: ['userId'],
      });

      // 关注我的 用户ID列表
      const followMyIds = followMy.map((item) => {
        return item.userId;
      });

      // 互相关注的列表
      const { rows: mutualFollowList, count: userCount } =
        await this.userModel.findAndCountAll({
          where: { id: followMyIds },
          limit: pageSize,
          offset: pageIndex,
        });

      return {
        lists: mutualFollowList,
        total: userCount,
        page_size: pageSize,
        page_index: parseInt(page_index),
      };
    } catch (error) {
      throw new HttpException(error, 600);
    }
  }

  // 取消关注
  async unFollow(my_id, unfollow_user_id) {
    try {
      const user = await this.userModel.findOne({
        where: { id: my_id },
      });
      if (!user) throw new HttpException('用户ID不存在', 600);

      const unFollowUser = await this.userModel.findOne({
        where: { id: Number(unfollow_user_id) },
      });
      if (!unFollowUser) throw new HttpException('用户ID不存在', 600);

      const res = await this.followerModel.destroy({
        where: { followerId: unfollow_user_id, userId: my_id },
      });

      return {
        msg: '取消关注成功',
        data: res,
      };
    } catch (error) {
      throw new HttpException(error, 600);
    }
  }

  // 邮箱注册
  async emailRegister(column) {
    try {
      const userEmail = await this.userModel.findOne({
        where: { email: column.email },
      });
      if (!!userEmail) throw new HttpException('邮箱已注册', 600);
      const userTel = await this.userModel.findOne({
        where: { tel: column.tel },
      });
      if (!!userTel) throw new HttpException('手机号已注册', 600);
      const res = await this.userModel.create(column);
      await res.$create('vip_card', {});
      return {
        code: 200,
        msg: '注册成功',
        data: { id: res.id },
      };
    } catch (error) {
      console.error(error);

      throw new HttpException(error, 600);
    }
  }

  async loginHistory({ user_id, page_size, page_index }) {
    try {
      const pageSize = page_size;
      const pageIndex = pageSize * (page_index - 1);
      const user = await this.userModel.findOne({ where: { id: user_id } });
      const lists = await user.$get('login_history', {
        limit: pageSize,
        offset: pageIndex,
      });
      const count = await user.$count('login_history');

      return {
        lists,
        total: count,
        page_size: pageSize,
        page_index: pageIndex,
      };
    } catch (error) {
      throw error;
    }
  }

  // // 删除用户
  // async removeUser(id: number) {
  //   try {
  //     const res = await this.userModel.delete(id);
  //     return res;
  //   } catch (error) {
  //     throw new HttpException(error, 600);
  //   }
  // }
}
