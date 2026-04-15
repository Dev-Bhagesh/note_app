"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/"); // No token? Go to login
            return;
        }

        // ✅ Check if token is expired by decoding it
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
            const isExpired = payload.exp * 1000 < Date.now();     // exp is in seconds

            if (isExpired) {
                localStorage.removeItem("token");
                router.push("/");
            }
        } catch (e) {
            localStorage.removeItem("token");
            router.push("/");
        }
    }, []);

    return (
        <>
            <div className="main flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-slate-900">
        <Sidebar />
            </div>
        </>
    );
}