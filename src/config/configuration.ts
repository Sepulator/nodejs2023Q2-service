const DEFAULT_PORT = 4000;

export const configuration = () => {
  return {
    port: process.env.PORT || DEFAULT_PORT,
  };
};
