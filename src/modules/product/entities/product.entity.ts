import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import slugify from 'slugify';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { SubCategory } from 'src/modules/sub-category/entities/sub-category.entity';
import { User } from 'src/modules/users/entities/user.entity';
  

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

  @Prop({
    type: String, required: true,
    default: function (this: Product) {
      const slug = slugify(this.name, { lower: true, trim: true })
      return slug;
    }
  })
  slug: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({
    type: Number,
    default: function (this: Product) {
      if (this.discount > 0) {
        return this.price - this.discount;
      }
      return this.price;
    }
  })
  priceAfterDiscount: number;

  @Prop({ type: Number, default: 0 })
  stock: number;

  @Prop({ type: Number, default: 0 })
  ratingAvg: number;

  @Prop({ type: Number, default: 0 })
  ratingCount: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String })
  mainImage: string;
  
  @Prop({ type: [String] })
  gallery: string[];

  @Prop({ type: Types.ObjectId, ref: Category.name })
  categoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: SubCategory.name })
  subCategoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brandId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;

   @Prop({ type: Types.ObjectId, ref:User.name })
  updatedBy: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

const productModel = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
]);
export default productModel;
