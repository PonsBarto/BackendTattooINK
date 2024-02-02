import express from "express";
import { AuthController } from "./controllers/AuthController";
import  authRoutes from "./routes/auth.routes"
import artistRoutes from "./routes/artists.routes"
import appoinmentRoutes from "./routes/appointments.routes"


const router = express.Router();


router.use("/auth", authRoutes);
router.use("/api/artist", artistRoutes);
router.use("/api/appointment", appoinmentRoutes);

export default router;