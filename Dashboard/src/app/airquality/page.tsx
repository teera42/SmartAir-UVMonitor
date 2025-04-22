"use client"
import { Gauge } from "lucide-react";
import Footer from "../Component/Footer/footer";
import Navbar from "../Component/Navbar/navbar";
import GraphAirQualityDetail from "../Component/Graph/airqualitygraph";
import { useEffect, useState } from "react";
import SingleValueDonutChart from "../Component/Graph/piechart";

export default function AirQualityDetailPage(){
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
                      <Gauge className="text-[#DA2129]"/> 
                      <p>Air Quality</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                  <SingleValueDonutChart value={data ? data.gasValue: 0 } min={0} max={1000} tname="air"/>
                  </div>
                </div>
          </div>
    
              <div className="mx-auto my-20 flex flex-col items-center">
                <div className="mb-4 w-full max-w-4xl text-left">
                    <span className="text-2xl font-semibold">Real-Time Graph</span>    
                </div>
                <div className="mt-4 w-full flex justify-center">
                     <div className="w-full max-w-4xl">
                       <GraphAirQualityDetail/>
                     </div>
                  </div>
                </div>  

                <div className="mx-auto my-20 flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">ระดับคุณภาพอากาศตามค่าปริมาณแก๊ส </h2>
                  <table className="min-w-100 text-sm text-center border border-gray-300 rounded-lg overflow-hidden shadow-lg divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-[#DA2129] text-white">
                        <th className="px-4 py-2 border-r border-white rounded-tl-lg">ค่าปริมาณแก๊ส (Gas Value)</th>
                        <th className="px-4 py-2 rounded-tr-lg">คุณภาพอากาศ (Air Quality)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">0 - 400</td>
                        <td className="px-4 py-2 text-green-600 font-semibold"> Fresh Air</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">401 - 1000</td>
                        <td className="px-4 py-2 text-red-600 font-semibold"> Bad Air</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mx-auto my-20 flex flex-col items-center">
                  <p>Reference: 
                    <a href="https://projecthub.arduino.cc/sheekar/mq-135-sensor-co2-benzyne-with-arduino-sheekar-banerjee-78652f" target="_blank" rel="noopener noreferrer"  className="block break-words text-blue-700 underline">
                      https://projecthub.arduino.cc/sheekar/mq-135-sensor-co2-benzyne-with-arduino-sheekar-banerjee-78652f
                   </a>
                  </p>
                </div>
 
          </main>
           <Footer/>
        </div>
  
    );
}