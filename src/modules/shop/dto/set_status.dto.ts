import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';

export class SetStatusDto {
  @IsNotEmpty({})
  @IsInt()
  shop_id: number;

  @IsNotEmpty({})
  @IsInt()
  @Max(3)
  @Min(1)
  status: number;
}
