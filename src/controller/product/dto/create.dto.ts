import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsInt,
  IsUrl,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: 'title 产品标题不能为空' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'describe 产品描述不能为空' })
  describe: string;

  @IsString()
  @IsNotEmpty({ message: 'use_time 使用时间不能为空' })
  use_time: string;

  @IsDecimal(
    {
      decimal_digits: '2', // 强制2位小数点
    },
    {
      message: 'price 必须是2位小数点',
    },
  )
  @IsNotEmpty({ message: 'price 价格不能为空' })
  price: string;

  @IsDecimal(
    {
      decimal_digits: '2', // 强制2位小数点
    },
    {
      message: 'old_price 必须是2位小数点',
    },
  )
  @IsNotEmpty({ message: 'old_price 原价不能为空' })
  old_price: string;

  @IsString()
  @IsNotEmpty({ message: 'detail 详情不能为空' })
  detail: string;

  @IsUrl()
  @IsNotEmpty({ message: 'cover_pic 封面图不能为空' })
  cover_pic: string;

  @IsInt()
  @IsNotEmpty({ message: 'shop_id 店铺ID不能为空' })
  shop_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'unit_id 单位ID不能为空' })
  unit_id: number;

  @ArrayMinSize(1, { message: 'imgs 必须大于1张 小于5张图片' })
  @ArrayMaxSize(5, { message: 'imgs 必须大于1张 小于5张图片' })
  @IsNotEmpty({ message: 'imgs 产品图片不能为空' })
  imgs: [string];
}
