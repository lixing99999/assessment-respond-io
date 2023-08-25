import express from "express";
import { createUserNote, deleteUserNote, getUserNoteById, getUserNoteByUserId, updateUserNote } from "../controllers/userNoteController";
import { cacheMachanism } from "../middlewares/cache";

const router = express.Router();

router.post("/note", createUserNote);
router.get("/note", cacheMachanism, getUserNoteByUserId)
router.get("/note/:id", getUserNoteById)
router.put("/note/:id", updateUserNote)
router.delete("/note/:id", deleteUserNote)




export default router;
