import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    mainImage: string;

    @IsOptional()
    @IsArray()
    @IsString()
    gallery: string[];


    // @IsString()
    // slug: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    stock: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    discount: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    priceAfterDiscount: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    ratingAvg: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    ratingCount: number;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsMongoId()
    categoryId: string;

    @IsOptional()
    @IsMongoId()
    subCategoryId: string;

    @IsNotEmpty()
    @IsMongoId()
    brandId: string;
}
