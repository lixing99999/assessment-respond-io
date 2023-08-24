import express from "express";
import { createUser, getUsers } from "../controllers/userController";

const router = express.Router();

router.get("/users", getUsers);
router.post("/user", createUser);

export default router;
