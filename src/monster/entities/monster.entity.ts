import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Nationality } from '../types/monster.type';
import { Document } from 'mongoose';

export class MonsterName extends Document {
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
    // type: { first: String, last: String, title: String },
    type: MonsterName,
    required: true,
  })
  // name: { first: string; last: string; title: string };
  name: MonsterName;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: String, enum: Nationality }], required: true })
  nationality: Nationality[];

  @Prop({ required: true })
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
