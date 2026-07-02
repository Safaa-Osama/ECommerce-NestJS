import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true })
  subCategory: Types.ObjectId;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

const productModel = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
]);
export default productModel;
