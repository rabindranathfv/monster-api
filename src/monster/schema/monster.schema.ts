import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Nationality } from '../types/monster.type';
import { Document } from 'mongoose';

export class MonsterName extends Document {
  @ApiProperty({
    example: 'Drogon',
    description: 'Monster name',
    required: true,
  })
  @Prop({ required: true })
  first: string;

  @ApiProperty({
    example: 'Fire',
    description: 'Monster lastname',
    required: true,
  })
  @Prop({ required: true })
  last: string;

  @ApiProperty({
    example: 'Mr.',
    description: 'Monster title',
    required: true,
  })
  @Prop({ required: true })
  title: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Monster extends Document {
  @ApiProperty()
  @Prop({
    type: MonsterName,
    required: true,
  })
  name: MonsterName;

  @ApiProperty({
    example: 'male',
    description: 'Monster gender',
    enum: Gender,
    required: true,
  })
  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @ApiProperty({
    example: 'this a powerfull dragon who can destroy everything',
    description: 'Monster description',
    required: true,
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: ['US', 'DE'],
    description: 'Monster nactionality',
    enum: Nationality,
    required: true,
    isArray: true,
  })
  @Prop({ type: [{ type: String, enum: Nationality }], required: true })
  nationality: Nationality[];

  @ApiProperty({
    example: 'https://example.com/dragon-image.jpg',
    description: 'Monster image',
    required: true,
  })
  @Prop({ required: true })
  image: string;

  @ApiProperty({
    example: 200,
    description: 'Monster goldBalance',
    required: false,
    default: 0,
  })
  @Prop({ default: 0 })
  goldBalance: number;

  @ApiProperty({
    example: 10.2,
    description: 'Monster speed',
    required: false,
    default: 0,
  })
  @Prop({ default: 0 })
  speed: number;

  @ApiProperty({
    example: 1000,
    description: 'Monster health',
    required: false,
    default: 0,
  })
  @Prop({ default: 0 })
  health: number;

  @ApiProperty({
    example:
      'this dragon is unique, you can only find it in the secret golden cave',
    description: 'Monster secretNotes',
    required: true,
  })
  @Prop()
  secretNotes: string;

  @ApiProperty({
    example: 'songoftheDragons',
    description: 'Monster password',
    required: true,
  })
  @Prop({ required: true })
  monsterPassword: string;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
