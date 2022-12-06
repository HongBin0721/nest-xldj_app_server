import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveDto {
  @IsInt()
  @IsNotEmpty({ message: 'technician_id 不能为空' })
  technician_id: number;
}
