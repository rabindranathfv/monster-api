import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '../types/user.types';

export class CreateUserDto {
  @ApiProperty({
    example: 'Manuel Torres',
    description: 'user fullName',
    required: true,
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'mtorres@gmail.com',
    description: 'user email',
    required: true,
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description: 'user password',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'user rol',
    enum: Role,
    required: false,
    default: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role, { message: 'Invalid Role' })
  role?: Role;
}
