import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { transformDate } from './utils/transform-date';
import {
  DataNotFoundException,
  WrongPassowrdException,
} from 'src/errors/errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    return transformDate(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => transformDate(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new DataNotFoundException('User');
    }

    return transformDate(user);
  }

  async findOneByLogin(login: string) {
    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user) {
      throw new DataNotFoundException('User');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new DataNotFoundException('User');
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new WrongPassowrdException();
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        version: { increment: 1 },
        password: updateUserDto.newPassword,
      },
    });

    return transformDate(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new DataNotFoundException('User');
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
