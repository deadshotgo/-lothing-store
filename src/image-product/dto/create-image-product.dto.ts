import {Transform} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";

export class CreateImageProductDto {
    @IsOptional()
    path: string;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    productId: number;
}
