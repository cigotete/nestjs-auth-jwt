import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({ required: true, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // token will expire in 7 days
  })
  createdAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
