import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
