import express from 'express';
import userRoutes from './userRoutes'
import userNoteRoutes from './userNoteRoutes'

const router = express.Router();
router.use(userRoutes)
router.use(userNoteRoutes)

export default router