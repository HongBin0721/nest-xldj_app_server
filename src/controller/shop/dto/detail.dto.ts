import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DetailDto {
  @IsNumberString({})
  @IsNotEmpty({ message: 'shop_id 不能为空' })
  shop_id: string;
}
