import express from "express";
import { createUserNote, getUserNoteById } from "../controllers/userNoteController";

const router = express.Router();

router.post("/note", createUserNote);
router.get("/note", getUserNoteById)


export default router;
