import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: '店铺名称不能为空' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '公司名称不能为空' })
  company: string;

  @IsString()
  @IsNotEmpty({ message: '营业执照图片不能为空' })
  license_img: string;

  @IsString()
  @IsNotEmpty({ message: '营业时间不能为空' })
  business_time: string;

  @IsString()
  @IsNotEmpty({ message: '简介不能为空' })
  introduce: string;

  @IsString()
  @IsNotEmpty({ message: '封面图不能为空' })
  cover_pic: string;

  @IsString()
  @IsNotEmpty({ message: '地址不能为空' })
  address: string;
}
