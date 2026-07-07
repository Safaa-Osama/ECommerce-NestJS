import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Types, HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Brand {
  @Prop({ type: String, required: true, min: 3, trim: true })
  name: string;

  @Prop({
    type: String, unique: true,
    default: function (this: Brand) {
      const slug = slugify(this.name, { lower: true, trim: true })
      return slug;
    }

  })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String })
  logo: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User"})
  updatedBy: Types.ObjectId

}

export const BrandSchema = SchemaFactory.createForClass(Brand);

export const brandModel = MongooseModule.forFeature([
  { name: Brand.name, schema: BrandSchema },
]);
