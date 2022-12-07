import { IsOptional, IsNotEmpty, IsNumberString } from 'class-validator';

export class ListsDto {
  @IsNumberString({})
  @IsNotEmpty({ message: '页码不能为空' })
  page_index: string;

  @IsNumberString({})
  @IsNotEmpty({ message: '页大小不能为空' })
  page_size: string;

  @IsOptional()
  @IsNumberString({})
  shop_id?: string;

  @IsOptional()
  @IsNumberString({})
  classify_id?: string;

  @IsOptional()
  @IsNumberString({})
  status?: string;
}
