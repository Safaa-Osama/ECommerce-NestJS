
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/modules/product/entities/product.entity';

export type CartDocument = HydratedDocument<Cart>;


class CartItems {
  @Prop({ type: Types.ObjectId, ref: Product.name})
  product: Types.ObjectId

  @Prop({ type: Number, default: 1 })
  quantity: number

  @Prop({ type: Number,required:true })
  subTotal: number

}

@Schema({
  timestamps: true,
  strictQuery: true,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Cart {
  @Prop({ type: [CartItems], required: true })
  products:CartItems[]

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  updatedBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  deletedBy: Types.ObjectId

  @Prop({ type: Date })
  deletedAt: Date

  @Prop({ type: Number, default: 0 })
  total: number
}


export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.pre("save",function(){
this.total = this.products.reduce((total,product)=>total + product.subTotal,0)
  })

export const cartModel = MongooseModule.forFeature([
  { name: Cart.name, schema: CartSchema },
]);
