import { IsBoolean, IsDate, IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateCouponDto {
    @IsString()
    code: string;

    @IsNumber()
    @IsPositive()
    @IsIn([1, 100], { message: 'Discount must be between 1% and 100%' })
    discount: number;

    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    maxUses: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    usesCount: number;

    @IsBoolean()
    isActive: boolean;
}
