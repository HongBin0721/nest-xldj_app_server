import { IsInt, IsNotEmpty } from 'class-validator';

export class SetDefaultAddressDto {
  @IsInt({ message: 'address_id 必须是整型' })
  @IsNotEmpty({ message: 'address_id不能为空' })
  address_id: number;
}
