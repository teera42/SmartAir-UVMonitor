"use client"
import { Sun } from "lucide-react";
import Footer from "../Component/Footer/footer";
import Navbar from "../Component/Navbar/navbar";
import GraphUvindexDetail from "../Component/Graph/uvindexgraph";
import { useEffect, useState } from "react";
import SingleValueDonutChart from "../Component/Graph/piechart";

export default function UvIndexDetailPage(){
  const [data, setData] = useState<sensordata | null>(null);
      type sensordata = {
        Time : string,
        humidity: number;
        temperature: number;
        gasValue: number;
        qualityAir: string;
        uvIndex: number;
      }
      useEffect(() =>{
        const fetchData = async () =>{
          try{
            const res = await fetch('http://localhost:30000/sensordata');
            if (!res.ok) throw new Error('Network response was not ok');
            setData(await res.json());
          }
          catch(error){
            setData(null);
          }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
      },[])
    return(
          <div>
            <Navbar/>
                <main>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-12 my-10 mx-auto" >
                        <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto ">
                            <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg">
                            <Sun className="text-[#DA2129]"/>
                            <p>UV Index</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                          <SingleValueDonutChart value={data ? data.uvIndex : 0} min={0} max={11} tname="uv"/>
                        </div>
                        </div>   
                    </div>
        
                  <div className="mx-auto my-20 flex flex-col items-center">
                    <div className="mb-4 w-full max-w-4xl text-left">
                        <span className="text-2xl font-semibold">Real-Time Graph</span>    
                    </div>
                    <div className="mt-4 w-full flex justify-center">
                         <div className="w-full max-w-4xl">
                           <GraphUvindexDetail/>
                         </div>
                      </div>
                    </div>

                    <div className="mx-auto my-20 flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">ระดับดัชนีรังสี UV </h2>
                  <table className="min-w-100 text-sm text-center border border-gray-300 rounded-lg overflow-hidden shadow-lg divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-[#DA2129] text-white">
                        <th className="px-4 py-2 border-r border-white rounded-tl-lg">ดัชนี UV (UV Index)</th>
                        <th className="px-4 py-2 border-r">ระดับ (Level)</th>
                        <th className="px-4 py-2 rounded-tr-lg">คำแนะนำ (Suggestion)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">0 - 2</td>
                        <td className="px-4 py-2 text-blue-600 font-semibold"> ต่ำ (Low)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> ปลอดภัย สามารถทำกิจกรรมกลางแจ้งได้โดยไม่ต้องป้องกัน</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">3 – 5</td>
                        <td className="px-4 py-2 text-green-600 font-semibold"> ปานกลาง (Moderate)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> เริ่มมีผลกระทบต่อผิวหนัง แนะนำให้ใส่หมวก กางร่ม หรือทาครีมกันแดด</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">6 – 7</td>
                        <td className="px-4 py-2 text-yellow-600 font-semibold"> สูง (High)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> อาจเกิดผิวไหม้ หากตากแดดนาน ควรสวมเสื้อแขนยาว ทาครีมกันแดด SPF 30+</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">8 – 10</td>
                        <td className="px-4 py-2 text-orange-600 font-semibold"> สูงมาก (Very High)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> ผิวไหม้ได้ใน 20 นาที หลีกเลี่ยงอยู่กลางแดดช่วง 10.00 – 16.00 น.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">11+</td>
                        <td className="px-4 py-2 text-red-600 font-semibold"> รุนแรงมาก (Extreme)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> อันตรายสูงมากต่อผิวและดวงตา ต้องหลีกเลี่ยงการโดนแสงแดดโดยตรง</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mx-auto my-20 flex flex-col items-center">
                  <p>Reference: 
                    <a href="https://drvsquare.com/knowledge/uv-index/" target="_blank" rel="noopener noreferrer"  className="block break-words text-blue-700 underline">
                      https://drvsquare.com/knowledge/uv-index/
                   </a>
                  </p>
                </div>
                </main>
            <Footer/>
          </div>
    );
}