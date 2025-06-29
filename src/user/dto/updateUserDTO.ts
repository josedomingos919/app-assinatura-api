import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateUserDTO {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
