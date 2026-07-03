import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import slugify from 'slugify';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class SubCategory {
  @Prop({ type: String, required: true,unique:true })
  name: string;

  @Prop({ type: String, unique: true,
    set: function (this: SubCategory) {
      const slug = slugify  (this.name, { lower: true, trim: true })
      return slug;
    }
  })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop(String)
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

const subCategoryModel = MongooseModule.forFeature([
  { name: SubCategory.name, schema: SubCategorySchema },
]);
export default subCategoryModel;
