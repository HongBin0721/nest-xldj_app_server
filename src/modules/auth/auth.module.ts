import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserLogin } from 'src/models/user_login.model';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([User, UserLogin]),

    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
