import { ApiProperty } from '@nestjs/swagger';
import { Gender, Nationality } from '../types/monster.type';

export class ResponseMonsterNameDto {
  @ApiProperty({
    example: 'Drogon',
    description: 'Monster name',
    required: true,
  })
  readonly first: string;
  @ApiProperty({
    example: 'Fire',
    description: 'Monster lastname',
    required: true,
  })
  readonly last: string;

  @ApiProperty({
    example: 'Mr.',
    description: 'Monster title',
    required: true,
  })
  readonly title: string;
}

export class ResponseMonsterDto {
  @ApiProperty({
    example: '65fc52ffbb606a0b8750f482',
    description: 'userId',
    uniqueItems: true,
  })
  readonly _id: string;

  @ApiProperty()
  readonly name: ResponseMonsterNameDto;

  @ApiProperty({
    example: 'male',
    description: 'Monster gender',
    enum: Gender,
    required: true,
  })
  readonly gender: string;

  @ApiProperty({
    example: 'this a powerfull dragon who can destroy everything',
    description: 'Monster description',
    required: true,
  })
  readonly description: string;

  @ApiProperty({
    example: ['US', 'DE'],
    description: 'Monster nactionality',
    enum: Nationality,
    required: true,
    isArray: true,
  })
  readonly nationality: string[];

  @ApiProperty({
    example: 'https://example.com/dragon-image.jpg',
    description: 'Monster image',
    required: true,
  })
  readonly image: string;

  @ApiProperty({
    example: 200,
    description: 'Monster goldBalance',
    required: false,
    default: 0,
  })
  readonly goldBalance?: number;

  @ApiProperty({
    example: 10.2,
    description: 'Monster speed',
    required: false,
    default: 0,
  })
  readonly speed?: number;

  @ApiProperty({
    example: 1000,
    description: 'Monster health',
    required: false,
    default: 0,
  })
  readonly health?: number;

  @ApiProperty({
    example:
      'this dragon is unique, you can only find it in the secret golden cave',
    description: 'Monster secretNotes',
    required: true,
  })
  readonly secretNotes?: string;

  @ApiProperty({
    example: 'songoftheDragons',
    description: 'Monster password',
    required: true,
  })
  readonly monsterPassword: string;
}
