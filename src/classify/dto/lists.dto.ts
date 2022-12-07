import { IsOptional, IsInt, IsNumberString } from 'class-validator';

export class ListsDto {
  @IsOptional()
  @IsNumberString({})
  parent_id?: string;

  @IsOptional()
  @IsNumberString({})
  is_tree?: string;
}
