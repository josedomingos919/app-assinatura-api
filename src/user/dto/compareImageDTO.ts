import { Transform } from "class-transformer";
import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class CompareImageDTO {
  @IsString()
  @IsNotEmpty()
  image1_base64: string;

  @IsString()
  @IsNotEmpty()
  image2_base64: string;
}
