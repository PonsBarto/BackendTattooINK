import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateRoles1706821381911 } from "./migrations/1706821381911-CreateRoles";
import { CreateUsers1706821384102 } from "./migrations/1706821384102-CreateUsers";
import { CreateUserRoles1706821386261 } from "./migrations/1706821386261-CreateUserRoles";
import { CreateArtists1706821388696 } from "./migrations/1706821388696-CreateArtists";
import { CreateAppointments1706821390750 } from "./migrations/1706821390750-CreateAppointments";
import { CreateDesigns1706821392619 } from "./migrations/1706821392619-CreateDesigns";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "root",
  database: "backendtattooink",
  entities: [`${__dirname}/../models/**/*{.js,.ts}`],
  migrations: [
    CreateRoles1706821381911,
    CreateUsers1706821384102,
    CreateUserRoles1706821386261,
    CreateArtists1706821388696,
    CreateAppointments1706821390750,
    CreateDesigns1706821392619,
  ],
  synchronize: false,
  logging: false,
});
