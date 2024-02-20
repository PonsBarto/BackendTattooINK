import express from "express";
import { DesignController } from "../controllers/DesignController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const designController = new DesignController();

router.get("/", auth, designController.getAll);
router.get("/:id", auth, designController.getById);
router.post("/", designController.create);
router.patch("/:id", designController.update);
router.delete("/:id", designController.delete);
router.get("/estilos", auth, designController.getByArtistId);

export default router;
