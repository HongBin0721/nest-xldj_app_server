import { IsNotEmpty, IsInt } from 'class-validator';

export class DeleteAddressDto {
  @IsInt({ message: 'address_id 必须是整型' })
  @IsNotEmpty({ message: 'address_id 不能为空' })
  address_id: number;
}
