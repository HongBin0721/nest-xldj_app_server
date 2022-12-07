import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

interface ObjData {
  count: number;
  product_id: number;
}

export class OrderConfirmDto {
  // @IsInt()
  // @IsNotEmpty({ message: 'count 不能为空' })
  // count: string;

  // @IsInt()
  // @IsNotEmpty({ message: 'product_id 不能为空' })
  // product_id: string;

  @IsArray()
  @IsNotEmpty({ message: 'products 不能为空' })
  products: ObjData[];
}
