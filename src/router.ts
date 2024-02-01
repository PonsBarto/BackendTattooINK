import express from "express";
import userRoutes from "./routes/user.routes";
import appointmentRoutes from "./routes/appointments.routes"


const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", userRoutes);
router.use("/api/appointments/", appointmentRoutes);

export default router;