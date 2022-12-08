import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DetailDto {
  @IsNumberString()
  @IsNotEmpty({ message: '产品ID不能为空' })
  product_id: string;
}
