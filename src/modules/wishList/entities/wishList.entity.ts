
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/modules/product/entities/product.entity';

export type WishListDocument = HydratedDocument<WishList>;


class WishListItems {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: Types.ObjectId

  @Prop({ type: Number, default: 1 })
  quantity: number

  @Prop({ type: Number, required: true })
  subTotal: number

}

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class WishList {
  @Prop({ type: [WishListItems], required: true })
  products: WishListItems[]

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  updatedBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  deletedBy: Types.ObjectId

  @Prop({ type: Date })
  deletedAt: Date
}


export const WishListSchema = SchemaFactory.createForClass(WishList);


export const WishListModel = MongooseModule.forFeature([
  { name: WishList.name, schema: WishListSchema },
]);
