import { GetAllUserDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ShareUserDto } from './dto/shareUserDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({
      include: {
        receivedShares: true,
        sentShares: true,
      },
    });

    return users;
  }

  async search(keword: string) {
    try {
      const where: any = {
        employee: {
          name: {
            mode: 'insensitive',
            contains: keword,
          },
        },
      };
      const users = await this.prisma.user.findMany({
        where,
      });
      return users;
    } catch (error) {
      throw new ForbiddenException({
        error,
        status: false,
      });
    }
  }

  async share(dto: ShareUserDto) {
    const response = await this.prisma.shared.create({
      data: {
        info: dto.info,
        userIdSent: dto.setUserId,
        userReceiveId: dto.receiveUserId,
      },
    });

    return response;
  }

  async getShare() {
    const response = await this.prisma.shared.findMany();

    return response;
  }
}
