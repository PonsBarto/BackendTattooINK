import express from "express";
import { ArtistController } from "../controllers/ArtistController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";
import { isAdmin } from "../middlewares/isAdmin";
import { ProfileController } from "../controllers/ProfileControler";


const router = express.Router();
const artistController= new ArtistController();

router.get("/", artistController.getAll);
router.get("/artistprofile/",auth, isAdmin, ProfileController.artistProfile);
router.get("/:id", auth, artistController.getById);
router.post("/",  artistController.create);
router.patch("/", auth, artistController.update);
router.delete("/:id", auth, isSuperAdmin, artistController.delete);



export default router;