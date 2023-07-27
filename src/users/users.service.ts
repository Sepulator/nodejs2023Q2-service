import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { createUser } from './utils/create-user';
import { omitUserPassword } from './utils/omit-password';
import { updateUserPassword } from './utils/update-password';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user = createUser(createUserDto);
    this.users.push(user);
    return omitUserPassword(user);
  }

  findAll() {
    return this.users.map((user) => omitUserPassword(user));
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        `User with id doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return omitUserPassword(user);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException(
        `User with id doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const user = this.users[index];

    if (updateUserDto.oldPassword !== user.password) {
      throw new HttpException(`Wrong user password`, HttpStatus.FORBIDDEN);
    }

    const updatedUser = updateUserPassword(user, updateUserDto);
    this.users[index] = updatedUser;
    return omitUserPassword(updatedUser);
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException(
        `User with id doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.users.splice(index, 1);
  }
}
