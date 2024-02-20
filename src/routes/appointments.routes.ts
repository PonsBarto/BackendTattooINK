import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";
import { isAdmin } from "../middlewares/isAdmin";


const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/", auth, isSuperAdmin, appointmentController.getAll);
router.get("/:id", auth, appointmentController.getById);
router.post("/", appointmentController.create);
router.patch("/:id", appointmentController.update);
router.delete("/:id", appointmentController.delete);
router.get("/miscitas/:id", auth, isAdmin, appointmentController.getByArtistId);

export default router;
