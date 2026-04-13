'use client'
import React from 'react';

const Newnote = ({setNewNote}) => {
    const resetNewNote=()=>{
        setNewNote(false)
    }
    return (
        <>
            <div className="newNote w-full h-full flex flex-col text-white border-gray-200 p-1 rounded-md shadow-sm
            overflow-hidden">
                <input
                    className="text-white font-bold outline-none bg-transparent"
                    type="text"
                    placeholder="Heading"
                />

                <textarea
                    className="flex-1 w-full outline-none bg-transparent resize-none"
                    placeholder="Write your note here"
                ></textarea>
                <button className="save rounded-xl hover:scale-105 duration-300 transition-all
                cursor-pointer p-1 w-3/6 md:w-1/12 bg-blue-500 self-end" onClick={resetNewNote}>Save</button>
            </div>
        </>
    )
}
export default Newnote;