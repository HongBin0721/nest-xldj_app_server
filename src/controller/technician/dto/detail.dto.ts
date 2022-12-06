import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DetailDto {
  @IsNumberString()
  @IsNotEmpty({ message: 'technician_id 不能为空' })
  technician_id: string;
}
