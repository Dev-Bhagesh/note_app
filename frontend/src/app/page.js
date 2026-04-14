import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Register from "@/components/Register";
export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-slate-900">
        {/*<Sidebar />*/}
        <Register/>
    </div>
  );
}
