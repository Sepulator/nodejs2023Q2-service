import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '@prisma/client';

export const updateUserPassword = (
  user: User,
  { newPassword }: UpdatePasswordDto,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, updatedAt, version, ...omitedUser } = user;
  return {
    password: newPassword,
    version: version + 1,
  };
};
