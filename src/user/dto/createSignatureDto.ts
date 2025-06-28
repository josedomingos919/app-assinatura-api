import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreateSignatureDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bi: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
