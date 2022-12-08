import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsPhone } from 'src/decorators/validator/isPhone';

export class UpdateDto {
  @IsInt()
  @IsNotEmpty({ message: 'user_id 不能为空' })
  user_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  nickname?: string;

  @IsOptional()
  @IsPhone()
  tel?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'email 不是合法邮箱',
    },
  )
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'avatar_url 不是合法的链接' })
  avatar_url?: string;
}
