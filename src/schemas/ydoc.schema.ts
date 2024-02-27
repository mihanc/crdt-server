import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type YDocDocument = HydratedDocument<YDoc>;

@Schema()
export class YDoc {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const YDocSchema = SchemaFactory.createForClass(YDoc);
