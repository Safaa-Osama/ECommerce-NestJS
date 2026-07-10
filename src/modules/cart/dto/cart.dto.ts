import { PartialType } from "@nestjs/mapped-types";
import { IsMongoId, IsNumber } from "class-validator";
import { Types } from "mongoose";
import { AtLeastOne } from "src/common/decorator/AtLeastOne.decorator";

export class CreateCartDto {
  @IsMongoId()
  product: Types.ObjectId;

  @IsNumber()
  quantity: number;
}

@AtLeastOne(['product', 'quantity'])
export class UpdateCartDto extends PartialType(CreateCartDto) {}
