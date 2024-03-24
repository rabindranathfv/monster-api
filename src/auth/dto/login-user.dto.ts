import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'mtorres@gmail.com',
    description: 'user email',
    required: true,
    uniqueItems: true,
  })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 123456,
    description: 'user email',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}
