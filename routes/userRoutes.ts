import express from "express";
import { createUser, getUsers, login } from "../controllers/userController";

const router = express.Router();

router.get("/users", getUsers);
router.post("/user", createUser);
router.post("/login", login);


export default router;
