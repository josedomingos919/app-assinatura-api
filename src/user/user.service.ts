import { GetAllUserDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { ShareUserDto } from "./dto/shareUserDto";
import { CreateSignatureDTO } from "./dto/createSignatureDto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({});

    return users;
  }

  async getAllSignatures(userId: number) {
    const signatures = await this.prisma.signatures.findMany({
      where: {
        userId,
      },
    });

    return signatures;
  }

  async crateSignature(dto: CreateSignatureDTO) {
    try {
      const response = await this.prisma.signatures.create({
        data: dto,
      });

      return response;
    } catch (error) {
      throw new ForbiddenException({ error });
    }
  }

  async removeSignature(id: number) {
    try {
      const signatures = await this.prisma.signatures.delete({
        where: {
          id,
        },
      });

      return signatures;
    } catch (error) {
      throw new ForbiddenException({ error });
    }
  }
}
