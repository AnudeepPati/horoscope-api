import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { HoroscopeHistory } from "../entities/HoroscopeHistory";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // TODO: Change to false and use migrations in production
  logging: false, // TODO: Enable logging in development for debugging
  entities: [User, HoroscopeHistory],
});
