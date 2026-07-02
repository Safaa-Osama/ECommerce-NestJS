import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import slugify from 'slugify';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Brand {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true,
    set: function (this: Brand) {
      const slug = slugify(this.name, { lower: true, trim: true })
      return slug;
    }

   })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  image: string;

}

export const BrandSchema = SchemaFactory.createForClass(Brand);

export const brandModel = MongooseModule.forFeature([
  { name: Brand.name, schema: BrandSchema },
]);
