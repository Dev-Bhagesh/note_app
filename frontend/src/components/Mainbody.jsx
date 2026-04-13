'use client'
import React from 'react'

const Mainbody = ()=>{
    return(
        <>
            <div className="main w-full h-full p-1 flex flex-col ">
                <div className="search border bg-white/10 backdrop-blur-lg border-white/20 rounded-xl shadow-xl
                p-1 text-white font-sans dark:text-white">
                    <input className="outline-none" type="text" placeholder="Search notes..."/>
                </div>

                <div className="notes text-white md:grid md:grid-cols-4 gap-4 flex-1 overflow-y-auto">
                    <div className="card h-25 black:text-white bg-white/10 rounded-xl border border-white/20
                    backdrop-blur-lg shadow-xl p-2 m-2">
                        <h1>Title</h1>
                        <div className="date">
                            13 April 2026
                        </div>
                        <div className="buttons flex gap-1 justify-end ">
                            <button className="view">V</button>
                            <button className="edit">E</button>
                            <button className="save">S</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mainbody