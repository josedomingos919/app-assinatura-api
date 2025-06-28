import { CreateSignatureDTO } from "./dto/createSignatureDto";
import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("all")
  getAll() {
    return this.userService.getAll();
  }

  @Get("signatures/:id")
  getAllSignatures(@Param("id", ParseIntPipe) userId: number) {
    return this.userService.getAllSignatures(userId);
  }

  @Post("signatures")
  createSignature(@Body() dto: CreateSignatureDTO) {
    return this.userService.crateSignature(dto);
  }

  @Post("signatures/:id")
  removeSignature(@Param("id", ParseIntPipe) id: number) {
    return this.userService.removeSignature(id);
  }
}
