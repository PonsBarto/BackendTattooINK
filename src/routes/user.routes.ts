import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";

const router = express.Router();
const userController = new UserController();

router.get("/",auth, isSuperAdmin, userController.getAllUsersFor);
router.get("/:profile", auth, userController.getById);
router.post("/", userController.create);
router.patch("/", auth, userController.update);
router.delete("/:id", auth, isSuperAdmin, userController.delete);

export default router;