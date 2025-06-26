import { config } from "dotenv";
config();
export const configEnv = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
};
