import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveDto {
  @IsNotEmpty()
  @IsInt({ message: 'id 类型错误' })
  id?: number;
}
