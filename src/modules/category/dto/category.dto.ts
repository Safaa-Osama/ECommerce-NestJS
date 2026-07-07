import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AtLeastOne } from "src/common/decorator/brand.decorator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    logo: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}

@AtLeastOne(['logo', 'name'])
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
}

export class IdDto{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}
