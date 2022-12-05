import { IsNotEmpty, IsString } from 'class-validator';

export class UnitCreateDto {
  @IsString()
  @IsNotEmpty({ message: '产品标题不能为空' })
  name: string;
}
