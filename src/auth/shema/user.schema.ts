import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Role } from '../types/user.types';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @ApiProperty({
    example: '65fc52ffbb606a0b8750f482',
    description: 'userId',
    uniqueItems: true,
  })
  @Prop()
  id: number;

  @ApiProperty({
    example: 'Manuel Torres',
    description: 'user fullName',
    required: true,
  })
  @Prop({ required: true })
  fullName: string;

  @ApiProperty({
    example: 'mtorres@gmail.com',
    description: 'user email',
    required: true,
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description: 'user password',
    required: true,
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'user rol',
    enum: Role,
    required: false,
    default: Role.USER,
  })
  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
