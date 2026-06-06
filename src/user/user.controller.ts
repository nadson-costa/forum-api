import { Controller, Post, Body, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { UserResponseDto } from './dto/user-response.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create (@Body() UserData: Prisma.UserCreateInput): Promise<UserResponseDto> {
    return this.userService.createUser(UserData);
  }

  @Get(':id')
  async getUserById (@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    const user = await this.userService.getUser({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Get()
  async getUsers (): Promise<UserResponseDto[]> {
    return this.userService.getUsers();
  }
}
