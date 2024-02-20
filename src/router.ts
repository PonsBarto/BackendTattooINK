import express from "express";
import { AuthController } from "./controllers/AuthController";
import userRoutes from "./routes/user.routes";
import  authRoutes from "./routes/auth.routes"
import artistRoutes from "./routes/artists.routes"
import appoinmentRoutes from "./routes/appointments.routes"
import designRoutes from "./routes/design.routes"

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/api/artist", artistRoutes);
router.use("/api/appointment", appoinmentRoutes);
router.use("/api/design", designRoutes);

export default router;