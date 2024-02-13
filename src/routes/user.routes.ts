import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";

const router = express.Router();
const userController = new UserController();

router.get("/", auth, isSuperAdmin, userController.getAll);
router.get("/:profile", auth, userController.getById);
router.post("/", userController.create);
router.patch("/:id", auth, userController.update);
router.delete("/:id", auth, isSuperAdmin, userController.delete);

export default router;