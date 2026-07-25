import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { OrderStatus, PaymentMethod, PaymentStatus } from "src/common/enums/orderEnum";
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
    userId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Cart.name })
    cartId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Coupon.name })
    couponId?: Types.ObjectId;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: String, required: true, enum: PaymentMethod })
    paymentMethod: PaymentMethod;

    @Prop({ type: String })
    phone: string;

    @Prop({ required: true, type: Number })
    totalPrice: number;

    @Prop({ required: true, type: String, enum: OrderStatus })
    status: OrderStatus;

    @Prop({ type: String, enum: PaymentStatus })
    paymentStatus: PaymentStatus;

    @Prop({ required: true, type: Number })
    totalAfterDiscount: number;

    @Prop({ type: Date, default: Date.now() + (2 * 24 * 60 * 60 * 1000) })
    deliveredAt: Date;

    
}


export const OrderSchema = SchemaFactory.createForClass(Order);

const orderModel = MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
]);

export default orderModel;
