import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddOrRemoveGoldMonsterDto {
  @ApiProperty({
    example: 120,
    description: 'Monster goldBalance',
    required: true,
  })
  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  amount: number;
}
