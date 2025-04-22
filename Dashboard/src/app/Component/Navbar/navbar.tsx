'use client';
import Image from "next/image"
import { useEffect, useState } from "react";
import { Usb , Clock , Menu } from "lucide-react";
import SidebarMenu from "../SidebarMenu/sidebarmenu";
export default function Navbar (){
    type SensorData =  {
        Time: string;
        humidity: number;
        temperature: number;
        gasValue: number;
        qualityAir: string;
        uvIndex: number;
      }
    const [isMenuopen,SetIsMenuOpen] = useState(false);
    const [isConnected,setIsConnected] = useState(false);
    const [data, setData] = useState<SensorData | null>(null);
      useEffect(() => {
        const checkConnection = async () => {
          try {
            const res = await fetch('http://localhost:30000/sensordata'); // เปลี่ยน path เป็น API ที่คุณใช้
            if (!res.ok) throw new Error('Network response was not ok');
            setIsConnected(true);
            setData(await res.json());
          } catch (error) {
            localStorage.removeItem('sensorData');
            localStorage.removeItem('alertSettings')
            setIsConnected(false);
            setData(null);
          }
        };
    
        checkConnection();
        const interval = setInterval(checkConnection, 5000); 
        return () => clearInterval(interval);
      }, []);
    return (
        <nav className="border-b-2 border-gray-50 shadow-lg">
             {isMenuopen && <SidebarMenu  onClose={() => SetIsMenuOpen(false)} />}
            <div className="navbar-line">
                 <hr className="w-full h-5 bg-[#DA2129] border-0" />
            </div>
            
            <div className="max-w-screen-xl mx-auto px-2 py-2 flex justify-end md:hidden">
                 <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center"  onClick={()=>SetIsMenuOpen(true)}>
                <Menu className="text-[#DA2129] w-5 h-5" onClick={()=>SetIsMenuOpen(true)} />
                </div>
            </div>
           <div className="max-w-screen-xl mx-auto px-2 py-2 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            
                <div className="flex items-center gap-4">
                   <a href="/"><Image className="" src="/picture/favicon.png" alt="" width={100} height={100}/></a>
                    <div>
                        <div className="text-2xl md:text-4xl text-[#DA2129] pb-1 font-bold">SmartAir&UvMonitor</div>
                        <div className="text-lg md:text-2xl text-gray-700">Real-time environmental data dashboard</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    {isConnected ? (<><div className="bg-green-200 w-auto h-auto rounded-2xl flex items-center justify-center px-3 py-1 gap-1" >
                        <Usb className="text-green-800 "/>
                        <span className="text-green-800 font-medium">Connected</span>             
                    </div></>)
                    :(<><div className="bg-red-200 w-auto h-auto rounded-2xl flex items-center justify-center px-3 py-1 gap-1" >
                        <Usb className="text-red-800 "/>
                        <span className="text-red-800 font-medium">Not Connected</span>             
                    </div></>)}
                    

                    <div className="flex items-center gap-1 text-sm md:text-base ">
                        <Clock />
                        <span>Updated: {data ? `${data.Time}` : "00/00/0000 00:00:00"}</span>
                    </div>

                    <div className="w-10 h-10 rounded-full border-2 items-center justify-center hidden md:flex cursor-pointer"  onClick={()=>SetIsMenuOpen(true)}>
                        <Menu className="text-[#DA2129] w-5 h-5 " onClick={()=>SetIsMenuOpen(true)} />
                    </div>

                </div>
                
           </div>

           
    </nav>
    
    );
}