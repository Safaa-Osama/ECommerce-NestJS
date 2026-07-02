import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import slugify from 'slugify';

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

  @Prop(String)
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({
    type: String, unique: true, required: true,
    set: function (this: Product) {
      const slug = slugify(this.name, { lower: true, trim: true })
      return slug;
    }
  })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

@Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true })
  subCategoryId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

const productModel = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
]);
export default productModel;
