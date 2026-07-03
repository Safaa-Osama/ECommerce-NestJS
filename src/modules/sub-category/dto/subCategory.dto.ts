import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    category: string;
}

export class UpdateSubCategoryDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    category?: string;
}