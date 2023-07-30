import { User } from '../interfaces/user.interface';

export const omitUserPassword = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
