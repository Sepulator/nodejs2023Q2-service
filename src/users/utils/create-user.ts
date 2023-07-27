import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';

export const createUser = ({ login, password }: CreateUserDto) => {
  const id = uuid();
  const time = new Date().getTime();
  const user: User = {
    id: id,
    login: login,
    password: password,
    version: 1,
    createdAt: time,
    updatedAt: time,
  };

  return user;
};
