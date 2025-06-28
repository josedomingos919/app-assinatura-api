import { GetAllUserDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { ShareUserDto } from "./dto/shareUserDto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({});

    return users;
  }
}
