const DEFAULT_PORT = 4000;
const DEFAULT_LOG_LEVEL = 5;
const DEFAULT_FILE_SIZE = 100;

export const configuration = () => {
  return {
    port: parseInt(process.env.PORT) || DEFAULT_PORT,
    logLevel: parseInt(process.env.LOG_LEVEL) || DEFAULT_LOG_LEVEL,
    fileSize: parseInt(process.env.FILE_SIZE) || DEFAULT_FILE_SIZE,
  };
};
