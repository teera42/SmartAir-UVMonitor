"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
export default function RouteLoader(){
    const [isLoading, setLoading] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() =>{
            setLoading(false);
        }, 400);
        return () =>clearTimeout(timeout);  
    },[pathname]);
    if(!isLoading) return null;
    return(
        <div className="fixed inset-0 bg-white/60 backdrop-brightness-30 z-50 flex items-center justify-center">
            <Loader className="w-15 h-15 text-[#DA2129] animate-spin" />
        </div>
    );
}