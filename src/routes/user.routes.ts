import express from "express";
import { UserController } from "../controllers/UserController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { auth } from "../middlewares/auth";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", auth, userController.getProfile);
router.patch("/:id", auth, userController.update);
router.get("/artists/list", auth, isSuperAdmin, userController.getAllArtists);
router.post("/artists/create", auth, isSuperAdmin, userController.createArtist);

export default router;