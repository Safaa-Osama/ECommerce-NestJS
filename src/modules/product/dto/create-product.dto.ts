import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    brand: string;
}
