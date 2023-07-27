/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../interfaces/user.interface';

export const updateUserPassword = (
  user: User,
  { newPassword, oldPassword }: UpdatePasswordDto,
): User => {
  const time = new Date().getTime();
  const { password, updatedAt, version, ...userWithoutPassword } = user;
  const newVersion = version + 1;
  return {
    password: newPassword,
    updatedAt: time,
    version: newVersion,
    ...userWithoutPassword,
  };
};
