import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateRoles1706821381911 } from "./migrations/1706821381911-CreateRoles";
import { CreateUsers1706821384102 } from "./migrations/1706821384102-CreateUsers";
import { CreateUserRoles1706821386263 } from "./migrations/1706821386263-CreateUserRoles";
import { CreateArtists1706821388694 } from "./migrations/1706821388694-CreateArtists";
import { CreateAppointments1706821390755 } from "./migrations/1706821390755-CreateAppointments";
import { CreateDesigns1706821392616 } from "./migrations/1706821392616-CreateDesigns";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "root",
  database: "backendtattooink",
  entities: [`${__dirname}/../models/**/*{.js,.ts}`],
  //migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
  migrations: [
    CreateRoles1706821381911,
    CreateUsers1706821384102,
    CreateUserRoles1706821386263,
    CreateArtists1706821388694,
    CreateAppointments1706821390755,
    CreateDesigns1706821392616,
  ],
  synchronize: false,
  logging: false,
});
