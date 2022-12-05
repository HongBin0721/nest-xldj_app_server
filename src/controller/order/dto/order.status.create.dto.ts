import { IsNotEmpty, IsString } from 'class-validator';

export class OrderStatusCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name: string;
}
