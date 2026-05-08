"use client";
import { useState } from "react";
import {RegisterFunction,LoginFunction} from '@/services/apis'
import {useRouter} from "next/navigation";

export default function Register() {

    const [isLogin, setIsLogin] = useState(true);
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const router = useRouter();

    const RegisterSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        let status = await RegisterFunction(userName, email, password)
        setLoading(false);
        if(status.status === 400){
            setMessage("Email already exists!")
            setMessageType("error")
        } else if(status.status === 200){
            setMessage("Successfully registered! Please login.")
            setMessageType("success")
            setIsLogin(true)  // ✅ switch to login form automatically
            setUserName("")
            setEmail("")
            setPassword("")
        } else {
            setMessageType("error")
        }
    }

    const LoginSubmitHandler =async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(email,password)
        let status = await LoginFunction(email,password)
        setLoading(false);
        if(status?.token){
            localStorage.setItem("token",status.token);
            localStorage.setItem("user",status.user)
            localStorage.setItem("userid",status.userid);
            router.push("/note");
        }else{
        alert(status?.error || "Login Failed")
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8">

                {/* Header */}
                <h1 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
                </h1>

                {
                    message && (
                        <div
                            className={`p-3 rounded-xl mb-4 text-center ${
                            messageType === "success"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                            >
                            {message}
                        </div>
                    )
                }

                <form className="flex flex-col gap-4" >
                    {!isLogin && (
                        <input
                            value={userName}
                            onChange={(e)=>{setUserName(e.target.value)}}
                            type="text"
                            placeholder="Full Name"
                            className="p-3 rounded-xl bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    <input
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded-xl bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-xl bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {isLogin?
                    <button
                        onClick={LoginSubmitHandler}
                        type="submit"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition p-3 rounded-xl font-semibold"
                        disabled={loading}
                         >
                        {loading ? "Please wait..." : "Login"}
                    </button>
                        :
                    <button
                        onClick={RegisterSubmitHandler}
                        type="submit"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition p-3 rounded-xl font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                    </button>
                    }

                </form>

                {/* Toggle */}
                <p className="text-center text-sm text-gray-400 mt-6 cursor-pointer">
                    {isLogin ? "Don’t have an account?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-400 ml-2 hover:underline cursor-pointer "
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
