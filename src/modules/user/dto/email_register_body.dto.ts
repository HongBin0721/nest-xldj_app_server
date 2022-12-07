import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPhone } from 'src/decorators/validator/isPhone';

export class EmailRegisterBodyDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  nickname: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: '请输入大于6小于32位数密码！',
  })
  @MaxLength(32, {
    message: '请输入大于6小于32位数密码！',
  })
  password: string;

  @IsPhone()
  tel: string;

  @IsEmail(
    {},
    {
      message: 'email 不是合法邮箱',
    },
  )
  email: string;

  @IsNotEmpty({ message: 'avatar_url 不是合法的链接' })
  avatar_url: string;
}
