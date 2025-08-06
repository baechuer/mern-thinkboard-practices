import express from 'express';
import { getNotesAll, createNote, updateNote, deleteNote, getNoteById } from '../controllers/notesControllers.js';

const router = express.Router();

router.get('/', getNotesAll)

router.get('/:id', getNoteById)

router.post('/', createNote)  

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)


export default router;
