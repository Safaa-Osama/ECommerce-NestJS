import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { Coupon } from "src/modules/coupon/entities/coupon.entity";
import { User } from "src/modules/users/entities/user.entity";

export type OrderDocument = HydratedDocument<Order>;


@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: true,
    strictQuery: true
})
export class Order {
    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    user: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Cart.name })
    cart: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Coupon.name })
    coupon: Types.ObjectId;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: String, required: true })
    paymentMethod: string;

    @Prop({ type: String })
    phone: string;

    @Prop({ required: true, type: Number })
    totalPrice: number;

    @Prop({ required: true, type: Number })
    totalAfterDiscount: number;
}


export const OrderSchema = SchemaFactory.createForClass(Order);

const orderModel = MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
]);

export default orderModel;
