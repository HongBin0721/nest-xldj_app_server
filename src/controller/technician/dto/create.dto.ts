import { IsNotEmpty, IsPhoneNumber, IsString, IsInt } from 'class-validator';
import { IsPhone } from 'src/decorators/validator/isPhone';

export class CreateDto {
  @IsInt()
  @IsNotEmpty({ message: '店铺ID不能为空' })
  shop_id: number;

  @IsString()
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '头像不能为空' })
  avatar_url: string;

  @IsString()
  @IsNotEmpty({ message: '证书不能为空' })
  certificate_img_url: string;

  @IsPhone()
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '简介不能为空' })
  about: string;
}
