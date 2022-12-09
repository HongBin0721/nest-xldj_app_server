import { Dependencies, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassifyModule } from './modules/classify/classify.module';
import { ProductModule } from './modules/product/product.module';
import { RoleModule } from './modules/role/role.module';
import { ShopModule } from './modules/shop/shop.module';
import { TechnicianModule } from './modules/technician/technician.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';

const IS_DEV = process.env.RUNNING_ENV === 'dev';
const IS_TEST = process.env.RUNNING_ENV === 'test';
const IS_PROD = process.env.RUNNING_ENV === 'prod';
const envFilePath = () => {
  const DEFAULT_ENV = ['.env.dev', '.env.db.dev'];
  if (IS_DEV) {
    return DEFAULT_ENV;
  } else if (IS_TEST) {
    return ['.env.test', '.env.db.dev'];
  } else if (IS_PROD) {
    return ['.env.prod', '.env.db.prod'];
  } else {
    return DEFAULT_ENV;
  }
};

@Dependencies()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath(),
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_TYPE as any,
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   // entities: ['./models/*.ts'],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_TYPE as any, // 数据库类型，sequelize支持  Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 且对数据库版本有要求。可移步官网查看
      host: process.env.DB_HOST, // 主机ip
      port: parseInt(process.env.DB_PORT), // 数据库端口 mysql默认在3306端口
      username: process.env.DB_USERNAME, // 数据库用户名
      password: process.env.DB_PASSWORD, // 数据库密码
      database: process.env.DB_DATABASE, // 具体数据库
      // models: [User, UserRole, Role, UserFollow, UserFan], // 要开始使用`User`模型，我们需要通过将其插入到`forRoot()`方法选项的`models`数组中来让`Sequelize`知道它的存在。
      autoLoadModels: true,
      synchronize: true,
      timezone: '+08:00', // 东八区
      sync: {
        alter: true,
      },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    RoleModule,
    UploadModule,
    ShopModule,
    ProductModule,
    AddressModule,
    OrderModule,
    TechnicianModule,
    ClassifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // dataSource: any;
  // constructor(dataSource) {
  //   this.dataSource = dataSource;
  // }
}
