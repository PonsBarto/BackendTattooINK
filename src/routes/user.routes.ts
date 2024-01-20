import express from "express";
import { User } from "../models/User";

const router = express.Router();


router.get("/",async (req, res) => {
 const allUsers = await User.find();
 res.json(allUsers)   
});

export default router;