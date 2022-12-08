import { IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsInt()
  @IsNotEmpty({ message: 'user_id 不能为空' })
  user_id: number;

  @IsNotEmpty()
  @MinLength(6, {
    message: '请输入大于6小于32位数密码！',
  })
  @MaxLength(32, {
    message: '请输入大于6小于32位数密码！',
  })
  newPassword: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: '请输入大于6小于32位数密码！',
  })
  @MaxLength(32, {
    message: '请输入大于6小于32位数密码！',
  })
  oldPassword: string;
}
