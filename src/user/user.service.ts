import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';



@Injectable()
export class UserService {

  constructor(private readonly prisma: DatabaseService) {}

  async createUser(data): Promise<UserResponseDto> { {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await this.prisma.user.create({ data });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }}

  async getUser(data): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: data });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
  
  async updateUser(params: { 
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
   }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ where: params.where, data });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }

}