import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { OrderStatus, PaymentMethod, PaymentStatus } from "src/common/enums/orderEnum";

export class CreateOrderDto {
    @IsMongoId()
    @IsOptional()
    couponId: Types.ObjectId;


    @IsString()
    @IsNotEmpty()
    address: string;

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    paymentMethod: PaymentMethod;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEnum(OrderStatus)
    @IsOptional()
    status: OrderStatus;

    @IsEnum(PaymentStatus)
    @IsOptional()
    paymentStatus: PaymentStatus;

    @IsDate()
    @IsOptional()
    deliveredAt: Date;
}
