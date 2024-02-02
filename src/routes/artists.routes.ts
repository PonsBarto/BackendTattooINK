import express from "express";
import { ArtistController } from "../controllers/ArtistController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";
import { isAdmin } from "../middlewares/isAdmin";


const router = express.Router();
const artistController= new ArtistController();

router.get("/", artistController.getAll);
router.get("/artistprofile/:id",auth, isAdmin, artistController.getByArtistId);
router.get("/:id", auth, artistController.getById);
router.post("/",  auth, isSuperAdmin, artistController.create);
router.patch("/:id", auth, isSuperAdmin, artistController.update);
router.delete("/:id", auth, isSuperAdmin, artistController.delete);



export default router;