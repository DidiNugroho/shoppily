import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
