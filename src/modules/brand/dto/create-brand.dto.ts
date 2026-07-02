import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
