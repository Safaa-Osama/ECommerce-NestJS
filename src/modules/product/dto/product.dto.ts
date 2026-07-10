import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { AtLeastOne } from "src/common/decorator/AtLeastOne.decorator";

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

export class ProductQueryDto{

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    skip: number;
}

export class IdDto{
    @IsMongoId()
    @IsNotEmpty()
    id: Types.ObjectId;
}

@AtLeastOne(['mainImage', 'gallery', 'name', 'description', 'price', 'stock', 'discount', 'isActive', 'categoryId', 'subCategoryId', 'brandId'])
export class UpdateProductDto extends PartialType(CreateProductDto) {
}