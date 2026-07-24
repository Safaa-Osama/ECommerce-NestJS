import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CouponDocument = HydratedDocument<Coupon>;
@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strictQuery: true,
    strict: true,
})
export class Coupon {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop({ unique: true, required: true, trim: true })
    code: string;

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    usedBy: Types.ObjectId[];

    @Prop({ required: true, min: 1, max: 100 })
    discount: number;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: 1 })
    maxUses: number;

    @Prop({ default: 0 })
    usesCount: number;

    @Prop({ default: false })
    isActive: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

const couponModel = MongooseModule.forFeature([
    { name: Coupon.name, schema: CouponSchema },
]);

export default couponModel;