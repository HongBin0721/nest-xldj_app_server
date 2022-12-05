import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumberString,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class UpdateAddressDto {
  @IsInt({ message: 'id 必须是整型' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number;

  @IsString({ message: 'page_index 必须是整型' })
  @IsNotEmpty({ message: '页码不能为空' })
  address: number;

  @IsString({ message: 'page_size 必须是整型' })
  @IsNotEmpty({ message: '页大小不能为空' })
  detail_address: number;

  @IsOptional()
  @IsString({ message: 'house_number 必须是字符串' })
  house_number: string;

  @IsString({ message: 'contact_name 必须是整型' })
  @IsNotEmpty({ message: 'contact_name 不能为空' })
  contact_name: string;

  @IsNumberString({}, { message: 'phone 必须是数字' })
  @IsNotEmpty({ message: 'phone 不能为空' })
  phone: string;

  @IsOptional()
  @IsBoolean({ message: 'is_default 必须是布尔值' })
  is_default: number;
}
