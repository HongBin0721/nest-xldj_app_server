import { IsString, IsNotEmpty } from 'class-validator';

export class OrderDetailDto {
  @IsString({ message: 'order_no 必须是字符串类型' })
  @IsNotEmpty({ message: 'order_no 不能为空' })
  order_no: string;
}
