import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Order {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  image: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);

const orderModel = MongooseModule.forFeature([
  { name: Order.name, schema: OrderSchema },
]);
export default orderModel;
