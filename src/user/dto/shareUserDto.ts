import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShareUserDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  setUserId: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  receiveUserId: number;

  @IsString()
  @IsNotEmpty()
  info: string;
}
