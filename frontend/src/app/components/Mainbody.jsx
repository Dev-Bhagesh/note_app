'use client'
import React, { useState, useEffect } from 'react'
import { getNotes, deleteNote } from '@/services/apis'  // ✅ import it

const Mainbody = ({setSelectedNote}) => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const fetchNotes = async () => {
            const result = await getNotes()
            setNotes(result?.data || [])
        }
        fetchNotes()
    }, [])

    const handledeleteNote = async (id) => {
        if(confirm("Delete this note?")){
            await deleteNote(id)
            setNotes(notes.filter(note=>note._id !== id))
        }
    }
    return (
        <div className="main w-full h-full p-1 flex flex-col">
            {/*<div className="search border bg-white/10 backdrop-blur-lg border-white/20 rounded-xl shadow-xl p-1 text-white">*/}
            {/*    <input className="outline-none bg-transparent text-white placeholder-gray-400"*/}
            {/*           type="text" placeholder="Search notes..."/>*/}
            {/*</div>*/}

            <div className="notes text-white md:grid md:grid-cols-4 gap-4 flex-1 overflow-y-auto mt-2">

                {notes.length === 0 ? (
                    <p className="text-gray-400 p-2">No notes yet. Create one!</p>
                ) : (
                    notes.map((note) => (          // ✅ loop over array
                        <div key={note._id}        // ✅ always use unique key
                             className="md:h-25 card text-white bg-white/10 rounded-xl border border-white/20 backdrop-blur-lg shadow-xl p-2 m-2">
                            <h1 className="font-bold">{note.title}</h1>
                            <div className="date text-gray-400 text-sm">
                                {new Date(note.createdAt).toLocaleDateString()}  {/* ✅ format date */}
                            </div>
                            <div className="buttons flex gap-1 justify-end mt-2">
                                <button onClick={()=>setSelectedNote(note)} className="view bg-blue-500 px-2 rounded">V</button>
                                <button onClick={()=>setSelectedNote(note)} className="edit bg-yellow-500 px-2 rounded">E</button>
                                <button onClick={()=>handledeleteNote(note._id)} className="save bg-red-500 px-2 rounded">D</button>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default Mainbody