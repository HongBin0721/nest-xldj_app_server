import { IsNotEmpty, IsInt } from 'class-validator';

export class FollowDto {
  @IsInt({ message: 'shop_id 必须是整型' })
  @IsNotEmpty({ message: '店铺ID不能为空' })
  shop_id: number;
}
