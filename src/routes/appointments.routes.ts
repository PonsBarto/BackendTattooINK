import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";


const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/", isSuperAdmin, appointmentController.getAll);
router.get("/:id", auth, appointmentController.getById);
router.post("/", appointmentController.create);
router.patch("/:id", appointmentController.update);
router.delete("/:id", appointmentController.delete);

export default router;
