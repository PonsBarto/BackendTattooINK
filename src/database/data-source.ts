import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateRoles1705565437308 } from "./migrations/1705565437308-CreateRoles";
import { CreateArtists1705568260571 } from "./migrations/1705568260571-CreateArtists";
import { CreateAppointments1705568263886 } from "./migrations/1705568263886-CreateAppointments";
import { CreateUsers1705568255708 } from "./migrations/1705568255708-CreateUsers";
import { CreateDesigns1705568266706 } from "./migrations/1705568266706-CreateDesigns";

export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
port: 3307,
username: "root",
password:"root",
database:"backendtattooink",
entities: [`${__dirname}/../models/**/*{.js,.ts}`],
//migrations: [`${__dirname}/database/migrations/**/*{.js,.ts}`],
migrations: [
CreateAppointments1705568263886, 
CreateArtists1705568260571, 
CreateDesigns1705568266706, 
CreateRoles1705565437308, 
CreateUsers1705568255708
],
synchronize: false,
logging: false,
});