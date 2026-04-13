import express from "express";
import {getNotes,readNote,deleteNote,createNote,updateNote} from "../controllers/noteController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
const note = express.Router();

note.post("/create",authMiddleware,createNote)
note.get('/getall',authMiddleware,getNotes)
note.get('/read/:id',authMiddleware,readNote)
note.put("/update/:id",authMiddleware,updateNote)
note.delete("/delete/:id",authMiddleware,deleteNote)

export default note;