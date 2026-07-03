import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    @IsString()
    gallery: string[];

    @IsOptional()
    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    description: string;

    price:number;
    stock:number;
    discountPercentage:number;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsNotEmpty()
    @IsString()
    subCategoryId: string;

    @IsNotEmpty()
    @IsString()
    brandId: string;


}
