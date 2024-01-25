import express, { Application } from "express";
import router from "./routes/user.routes";
import { User } from "./models/User";


declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }
const app: Application = express();


app.use(express.json());

export default app;


