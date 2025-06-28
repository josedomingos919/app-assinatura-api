import { ShareUserDto } from './dto/shareUserDto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @Get('search/:keword')
  search(@Param('keword') keword: string) {
    return this.userService.search(keword);
  }

  @Post('share')
  share(@Body() dto: ShareUserDto) {
    return this.userService.share(dto);
  }

  @Get('getShare')
  getShare() {
    return this.userService.getShare();
  }
}
