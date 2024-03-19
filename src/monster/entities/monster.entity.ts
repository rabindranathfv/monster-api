import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Nationality } from '../types/monster.type';
import { Document } from 'mongoose';

export class MonsterNameDto extends Document {
  @Prop({ required: true })
  first: string;

  @Prop({ required: true })
  last: string;

  @Prop({ required: true })
  title: string;
}

@Schema({ timestamps: true })
export class Monster extends Document {
  @Prop({
    type: MonsterNameDto,
  })
  name: MonsterNameDto;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop()
  description: string;

  @Prop({ type: [{ type: String, enum: Nationality }] })
  nationality: Nationality[];

  @Prop()
  image: string;

  @Prop({ default: 0 })
  goldBalance: number;

  @Prop({ default: 0 })
  speed: number;

  @Prop({ default: 0 })
  health: number;

  @Prop()
  secretNotes: string;

  @Prop({ required: true })
  monsterPassword: string;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
