import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AtLeastOne } from "src/common/decorator/brand.decorator";

export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    logo: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}

@AtLeastOne(['logo', 'name'])
export class UpdateBrandDto extends PartialType(CreateBrandDto) {
}

export class IdDto{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}