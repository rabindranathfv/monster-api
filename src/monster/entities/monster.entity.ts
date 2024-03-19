import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Nationality } from '../types/monster.type';

@Schema({ timestamps: true })
export class Monster {
  @Prop({
    required: true,
    type: {
      first: { type: String },
      last: { type: String },
      title: { type: String },
    },
  })
  name: { first: string; last: string; title: string };

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
