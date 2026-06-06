import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';



@Injectable()
export class UserService {

  constructor(private readonly prisma: DatabaseService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
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