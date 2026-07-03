import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
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

export class UpdateBrandDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
