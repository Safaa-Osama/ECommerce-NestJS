import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  image: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);

const categoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: CategorySchema },
]);
export default categoryModel;
