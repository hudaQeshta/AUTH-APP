import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ minlength: 2, maxlength: 50 })
  name: string;

  @Prop({ unique: [true, 'Email is already used'] })
  email: string;

  @Prop()
  gender: Gender;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
