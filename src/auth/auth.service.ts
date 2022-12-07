import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { VipCard } from 'src/models/vip_card.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  // 手机号+密码 登录
  createToken(params) {
    const token = this.jwtService.sign(params);
    return token;
  }

  async createLoginHistory({ user, ip }) {
    try {
      console.log('创建用户登录记录');

      const userOne = await this.userModel.findOne({
        where: { id: user.id },
      });
      console.log(userOne);

      const result = await userOne.$create('login_history', {
        login_ip: ip,
      });
      console.log(result);

      return result;
    } catch (error) {
      throw error;
    }
  }

  // 手机号+密码 验证
  async phoneLoginValidate(tel, password, code) {
    console.log('验证码：', code);

    try {
      const userPassword = await this.userModel.findOne({
        where: { tel: tel },
        attributes: ['password'],
      });
      if (!userPassword) return null;
      const isMatch = await bcrypt.compare(password, userPassword.password);

      if (isMatch) {
        const user = await this.userModel.findOne({
          where: { tel: tel },
          include: [
            {
              model: VipCard,
            },
          ],
        });

        return user.toJSON();
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
