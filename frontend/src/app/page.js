import Image from "next/image";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-slate-900">
        <Sidebar />
    </div>
  );
}
