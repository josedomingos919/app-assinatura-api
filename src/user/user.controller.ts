import { UserService } from "./user.service";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("all")
  getAll() {
    return this.userService.getAll();
  }
}
