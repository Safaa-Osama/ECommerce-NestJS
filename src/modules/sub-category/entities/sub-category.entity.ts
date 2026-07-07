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
    default: function (this: SubCategory) {
      const slug = slugify(this.name)
      return slug;
    }
  })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop(String)
  logo: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

const subCategoryModel = MongooseModule.forFeature([
  { name: SubCategory.name, schema: SubCategorySchema },
]);
export default subCategoryModel;
