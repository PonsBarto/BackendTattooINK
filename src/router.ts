import { Express } from "express";
import userRoutes from "./routes/user.routes";

const router = express.Router();

router.use('/api/users', userRoutes );

export default router;