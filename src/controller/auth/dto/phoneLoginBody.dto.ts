import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPhone } from 'src/decorators/validator/isPhone';

export class PhoneLoginBodyDto {
  @IsString({ message: '手机号类型不正确' })
  @IsPhone({ message: '手机格式不正确' })
  tel: string;

  @IsString({ message: '密码类型不正确' })
  @IsNotEmpty({ message: '密码不能位空' })
  password: string;
}
