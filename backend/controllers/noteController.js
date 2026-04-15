import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
    try {
        const user = req.user.id;
        const notes = await Note.find({user}).sort({createdAt: -1})
        // console.log(notes)
        res.json({
            data: notes,
            message: "Successfully fetched all notes"
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const readNote = async (req, res) => {
    try {
        const noteID = req.params.id
        const user = req.user.id;
        const note = await Note.findById(noteID)
        if (!note) {
            return res.status(404).json({message: "Not found"})
        }
        if (note.user.toString() !== user) {
            return res.status(403).json({message: "Not authorized"})
        }
        res.json({data: note})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const createNote = async (req, res) => {
    try {

        const {title, content} = req.body;
        const user = req.user.id
        const note = await Note.create({title, content, user})
        res.json({
            success: true,
            message: "Created note",
            data: note
        })
    } catch (err) {
        res.status(401).json({message: err})
    }
}

export const updateNote = async (req, res) => {
    try {
        const noteID = req.params.id
        const {title, content} = req.body;
        const user = req.user.id
        const updatenote = await Note.findById(noteID)
        if (!updatenote) {
            return res.status(404).json({message: "No such note", data: null})
        }
        if (updatenote.user.toString() !== req.user.id) {
            return res.status(403).json({message: "not the owner", data: null})
        }
        updatenote.title = title || updatenote.title;
        updatenote.content = content || updatenote.content
        await updatenote.save()
        res.json({success: true, message: "Updated note", data: updatenote})
    } catch (err) {
        res.status(500).json({message: err})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const noteID = req.params.id;
        const user = req.user.id;
        const note = await Note.findById(noteID)
        if (!note) {
            return res.status(404).json({message: "No such note", data: null})
        }
        if (note.user.toString() !== user) {
            return res.status(403).json({message: "not the owner", data: null})
        }
        await Note.deleteOne({_id: noteID})
        res.json({success: true, message: "Deleted note", data: null})
    } catch (err) {
        res.status(500).json({message: err.message, data: null})
    }
}