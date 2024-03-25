import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, Nationality } from '../types/monster.type';

export class MonsterNameDto {
  @ApiProperty({
    example: 'Drogon',
    description: 'Monster name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first: string;

  @ApiProperty({
    example: 'Fire',
    description: 'Monster lastname',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last: string;

  @ApiProperty({
    example: 'Mr.',
    description: 'Monster title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class CreateMonsterDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => MonsterNameDto)
  @IsNotEmpty()
  name: MonsterNameDto;

  @ApiProperty({
    example: 'male',
    description: 'Monster gender',
    enum: Gender,
    required: true,
  })
  @IsEnum(Gender, { message: 'Invalid gender' })
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    example: 'this a powerfull dragon who can destroy everything',
    description: 'Monster description',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: ['US', 'DE'],
    description: 'Monster nactionality',
    enum: Nationality,
    required: true,
    isArray: true,
  })
  @IsArray()
  @IsEnum(Nationality, { each: true, message: 'Invalid nationality' })
  @IsNotEmpty()
  nationality: Nationality[];

  @ApiProperty({
    example: 'https://example.com/dragon-image.jpg',
    description: 'Monster image',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: 200,
    description: 'Monster goldBalance',
    required: false,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  goldBalance?: number;

  @ApiProperty({
    example: 10.2,
    description: 'Monster speed',
    required: false,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  speed?: number;

  @ApiProperty({
    example: 1000,
    description: 'Monster health',
    required: false,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @ApiProperty({
    example:
      'this dragon is unique, you can only find it in the secret golden cave',
    description: 'Monster secretNotes',
    required: true,
  })
  @IsString()
  @IsOptional()
  secretNotes?: string;

  @ApiProperty({
    example: 'songoftheDragons',
    description: 'Monster password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  monsterPassword: string;
}
