import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
