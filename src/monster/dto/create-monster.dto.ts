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
  @IsString()
  @IsNotEmpty()
  first: string;

  @IsString()
  @IsNotEmpty()
  last: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class CreateMonsterDto {
  @ValidateNested()
  @Type(() => MonsterNameDto)
  @IsNotEmpty()
  name: MonsterNameDto;

  @IsEnum(Gender, { message: 'Invalid gender' })
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsEnum(Nationality, { each: true, message: 'Invalid nationality' })
  @IsNotEmpty()
  nationality: Nationality[];

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  goldBalance?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  speed?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsString()
  @IsOptional()
  secretNotes?: string;

  @IsString()
  @IsNotEmpty()
  monsterPassword: string;
}
