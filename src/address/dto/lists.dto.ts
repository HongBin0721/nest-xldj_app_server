import { IsInt, IsNotEmpty } from 'class-validator';

export class ListsDto {
  @IsInt({ message: 'page_index 必须是整型' })
  @IsNotEmpty({ message: '页码不能为空' })
  page_index: number;

  @IsInt({ message: 'page_size 必须是整型' })
  @IsNotEmpty({ message: '页大小不能为空' })
  page_size: number;
}
