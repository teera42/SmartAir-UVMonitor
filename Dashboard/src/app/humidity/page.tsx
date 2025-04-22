"use client"
import { ChevronRight, Droplets } from "lucide-react";
import Navbar from "../Component/Navbar/navbar";
import SingleValueDonutChart from "../Component/Graph/piechart";
import Footer from "../Component/Footer/footer";
import GraphHumidityDetail from "../Component/Graph/humiditygraph";
import { useEffect, useState } from "react";

export default function HumidityDetailPage(){
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
                        <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto">
                            <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg ">
                                <Droplets className="text-[#DA2129]"/> 
                                <p>Humidity</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                                <SingleValueDonutChart value={data ? data.humidity : 0} min={0} max={100} tname="hum"/>
                            </div>
                        </div>  
                    </div>
                    <div className="mx-auto my-20 flex flex-col items-center">
                        <div className="mb-4 w-full max-w-4xl text-left">
                            <span className="text-2xl font-semibold">Real-Time Graph</span>    
                        </div>
                        <div className="mt-4 w-full flex justify-center">
                            <div className="w-full max-w-4xl">
                                <GraphHumidityDetail/>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto my-20 flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">ระดับความชื้นสัมพัทธ์ </h2>
                  <table className="min-w-100 text-sm text-center border border-gray-300 rounded-lg overflow-hidden shadow-lg divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-[#DA2129] text-white">
                        <th className="px-4 py-2 border-r border-white rounded-tl-lg">ความชื้นสัมพัทธ์ (%)</th>
                        <th className="px-4 py-2 border-r border-white rounded-tl-lg">ระดับ (Level)</th>
                        <th className="px-4 py-2 rounded-tr-lg">ความหมายโดยทั่วไป (General Meaning)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200"> &lt; 30%</td>
                        <td className="px-4 py-2 text-blue-600 font-semibold"> ต่ำ(Low)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> อากาศแห้ง อาจทำให้ระคายเคืองผิว หายใจลำบาก</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">30% - 59%</td>
                        <td className="px-4 py-2 text-green-600 font-semibold"> ปานกลาง(Moderate)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> ระดับเหมาะสม รู้สึกสบาย</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">60% - 69%</td>
                        <td className="px-4 py-2 text-yellow-600 font-semibold"> สูง(High)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> เริ่มรู้สึกอบอ้าว</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">70% - 89%</td>
                        <td className="px-4 py-2 text-orange-600 font-semibold"> สูงมาก(Very High)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> อบอ้าว เหนียวตัว ไม่สบาย</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">≥ 90%</td>
                        <td className="px-4 py-2 text-red-600 font-semibold"> อันตราย(Danger)</td>
                        <td className="px-4 py-2 border-r border-gray-200"> เสี่ยงต่อการเกิดโรค เช่น เชื้อรา แบคทีเรีย เจริญเติบโตได้ดี</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mx-auto my-20 flex flex-col items-center">
                  <p>Reference: 
                    <a href="https://www.who.int/publications/i/item/9789289002134"  target="_blank" rel="noopener noreferrer" className="block break-words text-blue-700 underline">
                    https://www.who.int/publications/i/item/9789289002134
                   </a>
                  </p>
                </div>
                </main>
                <Footer/>
                </div>
    );
}