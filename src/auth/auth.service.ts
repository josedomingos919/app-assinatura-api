import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SignupDto } from "./dto";
import { SigninDto } from "./dto/signinDto";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";

import * as argon from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: SignupDto) {
    try {
      const password = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          password: password,
          email: dto.email,
        },
      });

      return user;
    } catch (error) {
      throw new ForbiddenException({
        error,
        status: false,
      });
    }
  }

  async signin(dto: SigninDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user)
        throw new ForbiddenException({
          message: "credential incorrect",
          status: false,
        });

      const passwordMatches = await argon.verify(user.password, dto.password);

      if (!passwordMatches)
        throw new ForbiddenException({
          message: "credential incorrect",
          status: false,
        });

      const token = await this.getSignToken(user.id, user.email);

      return {
        user,
        token,
      };
    } catch (error) {
      throw new ForbiddenException({
        error,
        status: false,
        message: "unexpected error",
      });
    }
  }

  getSignToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: this.config.get("JWT_SECRET"),
    });
  }
}
