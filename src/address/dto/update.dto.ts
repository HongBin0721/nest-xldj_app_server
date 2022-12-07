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

  @IsString()
  @IsString({ message: 'province 必须是字符串' })
  province: string;

  @IsString()
  @IsString({ message: 'city 必须是字符串' })
  city: string;

  @IsString()
  @IsString({ message: 'district 必须是字符串' })
  district: string;

  @IsString({ message: 'page_size 必须是整型' })
  @IsNotEmpty({ message: '页大小不能为空' })
  detail_address: number;

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
