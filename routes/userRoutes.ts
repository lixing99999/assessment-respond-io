import express from "express";
import { createUser, getUser, login } from "../controllers/userController";

const router = express.Router();

router.get("/user", getUser);
router.post("/user", createUser);
router.post("/login", login);


export default router;
