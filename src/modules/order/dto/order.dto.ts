import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsString()
    @IsNotEmpty()
    invoiceUrl: string;

    @IsString()
    @IsNotEmpty()
    invoiceNumber: string;
}
