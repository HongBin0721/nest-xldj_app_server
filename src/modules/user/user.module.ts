import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Role } from 'src/models/role.model';
import { UserRoleAssociations } from 'src/models/user_role_associations.model';
import { Follower } from 'src/models/follower.model';
import { UserLogin } from 'src/models/user_login.model';
import { Product } from 'src/models/product.model';
import { UserProductBuyAssociations } from 'src/models/user_product_buy_associations';
import { UserShopFollowAssociations } from 'src/models/user_shop_follow_associations.model';
import { Shop } from 'src/models/shop.model';
import { UserProductBrowseAssociations } from 'src/models/user_product_browse_associations.model';
import { ProductImage } from 'src/models/product_image.mode';
import { ProductTypeAssociations } from 'src/models/product_type_associations.model';
import { UserProductFavoriteAssociations } from 'src/models/user_product_favorite_associations.model';
import { Address } from 'src/models/address.model';
import { VipCard } from 'src/models/vip_card.model';
import { ProductType } from 'src/models/product_type.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoleAssociations,
      Follower,
      UserLogin,
      Product,
      ProductTypeAssociations,
      UserProductBuyAssociations,
      UserProductFavoriteAssociations,
      ProductType,
      ProductImage,
      UserShopFollowAssociations,
      Shop,
      UserProductBrowseAssociations,
      Address,
      VipCard,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
