import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AtLeastOne } from "src/common/decorator/AtLeastOne.decorator";

export class CreateSubCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    logo: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsMongoId()
    category: string;
}

@AtLeastOne(['logo', 'name'])
export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {
    @IsMongoId()
    category: string;
}

export class IdDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}
