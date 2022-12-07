import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';

export class SetStatusDto {
  @IsNotEmpty({})
  @IsInt()
  product_id: number;

  @IsNotEmpty({})
  @IsInt()
  @Max(2)
  @Min(1)
  status: number;
}
