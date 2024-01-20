import express, { Application } from "express";
import router from "./routes/user.routes";

////////////////////////////////////////////////////////////////////////////////////////////////

const app: Application = express();

//Middlewares
app.use(express.json());

export default app;


