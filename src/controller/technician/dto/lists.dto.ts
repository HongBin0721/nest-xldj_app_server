import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ListsDto {
  @IsNumberString()
  @IsNotEmpty({ message: '店铺ID不能为空' })
  shop_id: string;
}
