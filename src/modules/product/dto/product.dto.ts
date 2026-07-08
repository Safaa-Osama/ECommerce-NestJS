import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    mainImage: string;

    @IsOptional()
    @IsArray()
    @IsString()
    gallery: string[];


    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    discount: number;

    @IsOptional()
    @IsNumber()
    priceAfterDiscount: number;

    @IsOptional()
    @IsNumber()
    ratingAvg: number;

    @IsOptional()
    @IsNumber()
    ratingCount: number;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsMongoId()
    categoryId: string;

    @IsNotEmpty()
    @IsMongoId()
    subCategoryId: string;

    @IsNotEmpty()
    @IsMongoId()
    brandId: string;
}
