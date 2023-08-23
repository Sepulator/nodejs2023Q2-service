import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    salt: process.env.CRYPT_SALT,
    secret: process.env.JWT_SECRET_KEY,
    secretRefresh: process.env.JWT_SECRET_REFRESH_KEY,
    tokenTtl: process.env.TOKEN_EXPIRE_TIME,
    tokenTtlRefresh: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  };
});
