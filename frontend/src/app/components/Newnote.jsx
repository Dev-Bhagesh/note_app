'use client'
import React from 'react';
import { useState } from 'react'
import {noteCreate,updateNote} from "@/services/apis";

const Newnote = ({setNewNote,existingNote,setSelectedNote}) => {

    const [noteTitle , setNoteTitle] = useState(existingNote?.title||"")
    const [noteContent, setNoteContent] = useState(existingNote?.content||"")

    const isViewing = !!existingNote

    const SaveNote = async ()=>{
        if(isViewing){
            await updateNote(existingNote._id, noteTitle, noteContent)
            setSelectedNote(null)
        }else{
            await noteCreate(noteTitle, noteContent)
            setNewNote(false)
        }
    }

    const resetNewNote=()=>{
        setNewNote(false)
    }

    const OnTitleChange=(e)=>{
        setNoteTitle(e.target.value)
    }
    const OnNoteContentChange=(e)=>{
        setNoteContent(e.target.value)
    }

    // const SaveNote=async ()=>{
    //     let note = await noteCreate(noteTitle,noteContent)
    //     alert(note)
    // }

    const goBack = () =>{
        isViewing?setSelectedNote(null):setNewNote(false)
    }

    return (
        <>
            <div className="newNote w-full h-full flex flex-col text-white border-gray-200 p-1 rounded-md shadow-sm
            overflow-hidden">
                <input
                    value={noteTitle}
                    onChange={e => OnTitleChange(e)}
                    className="text-white font-bold outline-none bg-transparent"
                    type="text"
                    placeholder="Heading"
                />

                <textarea
                    value={noteContent}
                    onChange={e=>OnNoteContentChange(e)}
                    className="flex-1 w-full outline-none bg-transparent resize-none"
                    placeholder="Write your note here"
                ></textarea>
                <div className="buttons flex gap-1 justify-between">
                <button onClick={goBack} className="self-start rounded-xl hover:scale-105 duration-300 transition-all
                cursor-pointer p-1 w-3/6 md:w-1/12 bg-blue-500 self-end ">back</button>
                <button className="save rounded-xl hover:scale-105 duration-300 transition-all
                cursor-pointer p-1 w-3/6 md:w-1/12 bg-blue-500 self-end" onClick={SaveNote}>Save</button>
                </div>
            </div>
        </>
    )
}
export default Newnote;