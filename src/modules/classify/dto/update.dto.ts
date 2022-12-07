import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsInt({ message: 'id 类型错误' })
  id?: number;

  @IsOptional()
  @IsInt({ message: 'parent_id 类型错误' })
  parent_id?: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  info: string;

  @IsString()
  @IsOptional()
  icon_url: string;
}
