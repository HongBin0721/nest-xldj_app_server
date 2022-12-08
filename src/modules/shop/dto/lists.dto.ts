import { IsNotEmpty, IsInt, IsOptional, Min, Max } from 'class-validator';

export class ListsDto {
  @IsInt({ message: 'page_index 必须是整型' })
  @IsNotEmpty({ message: '页码不能为空' })
  page_index: number;

  @IsInt({ message: 'page_size 必须是整型' })
  @IsNotEmpty({ message: '页大小不能为空' })
  page_size: number;

  @IsInt({ message: 'status 必须是整型' })
  @IsOptional({})
  @Min(1)
  @Max(3)
  status: number;
}
