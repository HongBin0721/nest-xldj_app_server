import { IsOptional, IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsOptional()
  @IsInt({ message: 'parent_id 类型错误' })
  parent_id?: number;

  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name: string;

  @IsString()
  @IsOptional()
  info: string;

  @IsString()
  @IsOptional()
  icon_url: string;
}
