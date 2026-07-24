import { PartialType } from "@nestjs/mapped-types";
import { IsMongoId, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";
import { Types } from "mongoose";
import { AtLeastOne } from "src/common/decorator/AtLeastOne.decorator";

export class CreateCartDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: Types.ObjectId;

  @IsNumber()
  @IsPositive() 
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

@AtLeastOne(['productId', 'quantity'])
export class UpdateCartDto extends PartialType(CreateCartDto) {}
