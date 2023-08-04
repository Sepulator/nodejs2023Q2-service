import { User } from '@prisma/client';

export const omitUserPassword = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, createdAt, updatedAt, ...userWithoutPassword } = user;

  return {
    createdAt: createdAt.getTime(),
    updatedAt: updatedAt.getTime(),
    ...userWithoutPassword,
  };
};
