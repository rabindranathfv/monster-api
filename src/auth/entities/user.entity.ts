import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../types/user.types';

@Schema()
export class User extends Document {
  @Prop()
  id: number;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
