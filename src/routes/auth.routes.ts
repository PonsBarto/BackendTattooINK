import express from "express";
import { AuthController } from "../controllers/AuthController";



const router = express.Router();
const authController = new AuthController();

router.post("/registerClient", authController.registerClient);
router.post("/registerArtist", authController.registerArtist);
router.post("/login", authController.login);
router.get("/user/:userId", authController.getUserProfile);
router.put("/user/:userId", authController.updateUserProfile);

export default router;