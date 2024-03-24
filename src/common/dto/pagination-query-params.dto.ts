import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryParamsDto {
  @ApiProperty({
    example: 2,
    description: 'indicate with page you are looking for',
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @ApiProperty({
    example: 5,
    description: 'indicate how many items per page do you want',
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly limit?: number = 25;
}
