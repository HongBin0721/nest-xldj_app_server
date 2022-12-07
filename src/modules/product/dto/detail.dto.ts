import { IsNotEmpty, IsInt } from 'class-validator';

export class DetailDto {
  @IsInt()
  @IsNotEmpty({ message: '产品ID不能为空' })
  product_id: number;
}
