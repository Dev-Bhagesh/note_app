"use client"
import React from 'react'
import {useState, useEffect} from 'react'
import Newnote from '@/app/components/Newnote'
import Mainbody from "@/app/components/Mainbody";
import {useRouter} from 'next/navigation';

const Sidebar = () => {
    const [newNote, setNewNote] = useState(false)
    const router = useRouter();
    const [userName, setUserName] = useState('')

    const noteCreate = ()=>{
        setNewNote(true)
    }

    useEffect(()=>{
        setUserName(localStorage.getItem("user").toString());
    },[])

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        router.push("/")
    }

    return (
        <div className="flex h-screen w-full gap-3 overflow-hidden">
            <div className="flex flex-col items-center sidebar p-2 h-full sm:w-2/5 md:w-1/8 bg-slate-800 border-amber-50 text-white">
                <div className="heading flex justify-center my-2">
                    {userName}
                    <h1>📝 Notes</h1>
                </div>

                    <button onClick={noteCreate} className="cursor-pointer button h-10 bg-blue-500 p-1 flex items-center justify-center rounded-xl
                hover:scale-105 duration-300 transition-all sm:w-full md:w-3/4">+ New Note</button>

                <div onClick={handleLogout} className="logout flex justify-center my-2">
                    Logout
                </div>
            </div>

            {newNote ?
                <div className="rightside flex-1 h-full">
                    <Newnote setNewNote={setNewNote}/>
                </div> :
                <div className="rightside flex-1 h-full">
                    <Mainbody/>
                </div>
            }
        </div>
    )
}
export default Sidebar