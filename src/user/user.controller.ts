import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create (@Body() UserData: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.userService.createUser(UserData);
  }
}
