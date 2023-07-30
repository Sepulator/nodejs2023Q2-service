import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../interfaces/user.interface';

export const updateUserPassword = (
  user: User,
  { newPassword }: UpdatePasswordDto,
): User => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, updatedAt, version, ...userWithoutPassword } = user;
  return {
    password: newPassword,
    updatedAt: new Date().getTime(),
    version: version + 1,
    ...userWithoutPassword,
  };
};
