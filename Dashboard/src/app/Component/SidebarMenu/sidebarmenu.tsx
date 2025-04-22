import { X ,CircleHelp,Settings,CloudSun,ThermometerSun,Gauge,Sun,Siren ,House, Droplets} from "lucide-react";
export default function SidebarMenu({ onClose }:{onClose: () => void}){
    return(
        <><div
            className="fixed inset-0 backdrop-brightness-30 -sm z-40"
        ></div><aside className="fixed right-0 bg-white boder rounded shadow-md p-4 z-50 w-75 h-full">
                <button onClick={onClose} className="text-black float-right"><X /></button>
                <div className="text-[#DA2129] text-2.5xl font-bold pt-2 pb-5">Menu</div>
                <ul className="space-y-5  px-4">
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/"> <House className="text-[#DA2129]"/>
                            <span className="font-medium ">Home</span>
                        </a>     
                    </li>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/temperature"> <ThermometerSun className="text-[#DA2129]"/>
                            <span className="font-medium ">Temperature Details</span>
                        </a>     
                    </li>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/humidity"> <Droplets className="text-[#DA2129]"/>
                            <span className="font-medium ">Humidity Details</span>
                        </a>     
                    </li>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/airquality"> <Gauge className="text-[#DA2129]"/>
                            <span className="font-medium ">Air Quality Details</span>
                        </a>     
                    </li>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/uvindex"> <Sun className="text-[#DA2129]"/>
                            <span className="font-medium ">UV Index Details</span>
                        </a>     
                    </li>
                    <hr className="text-gray-200 shadow-sm"/>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="https://drive.google.com/file/d/1oHUdE72oWzaw293XVo4JBfKvQ4dY_tWQ/view?usp=sharing" target="_blank" rel="noopener noreferrer"> <CircleHelp className="text-[#DA2129]"/>
                            <span className="font-medium ">Guide</span>
                        </a>     
                    </li>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="https://www.tmd.go.th/" target="_blank" rel="noopener noreferrer"> <CloudSun className="text-[#DA2129]"  />
                            <span className="font-medium ">Weather Details</span>
                        </a>     
                    </li>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/alertsetting"> <Settings className="text-[#DA2129]"/>
                            <span className="font-medium ">Alert Setting</span>
                        </a>     
                    </li>
                    <hr className="text-gray-200 shadow-sm"/>
                    <li className="flex items-center justify-center">
                        <a className="flex items-center  gap-4 bg-gray-50 px-2 py-2 rounded-lg shadow-sm w-full" 
                        href="/aboutproject"> <Siren />
                            <span className="font-medium ">About Project</span>
                        </a>     
                    </li>
                </ul>

            </aside></>);
}