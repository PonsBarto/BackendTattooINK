import express from "express";
import userRoutes from "./routes/user.routes";
import appoinmentRoutes from "./routes/appointments.routes"


const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/appointment", appoinmentRoutes);


export default router;