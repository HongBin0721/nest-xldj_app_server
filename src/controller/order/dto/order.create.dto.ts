import {
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class OrderCreateDto {
  @IsArray()
  @IsNotEmpty({ message: 'products 不能为空' })
  products: object[];

  @IsInt()
  @IsNotEmpty({ message: 'address_id 不能为空' })
  address_id: number;

  @IsDecimal(
    {
      decimal_digits: '2', // 强制2位小数点
    },
    {
      message: 'total_amount 必须是2位小数点',
    },
  )
  @IsNotEmpty({ message: 'total_amount 不能为空' })
  total_amount: string;

  @IsDecimal(
    {
      decimal_digits: '2', // 强制2位小数点
    },
    {
      message: 'actual_amount 必须是2位小数点',
    },
  )
  @IsNotEmpty({ message: 'actual_amount 不能为空' })
  actual_amount: string;

  @IsDecimal(
    {
      decimal_digits: '2', // 强制2位小数点
    },
    {
      message: 'car_fare 必须是2位小数点',
    },
  )
  @IsNotEmpty({ message: 'car_fare 不能为空' })
  car_fare: string;

  @IsString()
  distance: string;

  @IsString()
  expected_driving_time: string;

  @IsString()
  @IsNotEmpty({ message: '备注不能为空' })
  remark: string;

  @IsString()
  @IsNotEmpty({ message: '服务时间不能为空' })
  service_time_period: string;
}
