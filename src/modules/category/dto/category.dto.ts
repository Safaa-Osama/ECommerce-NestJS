import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsLowercase, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
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

    @IsOptional()
    @IsArray()
    @IsMongoId()
    brands?: string[];
}

@AtLeastOne(['logo', 'name'])
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
}

export class IdDto{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}

export class QueryCategoryDto {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    page: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    skip: number;

    @IsString()
    @IsOptional()
    @IsLowercase()
    search: string;
}
