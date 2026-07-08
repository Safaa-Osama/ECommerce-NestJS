import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsBoolean, IsLowercase, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
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

export class IdDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}

export class QueryBrandDto {
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

