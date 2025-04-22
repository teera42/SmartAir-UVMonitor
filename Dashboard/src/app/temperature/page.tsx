"use client"
import Navbar from "../Component/Navbar/navbar";
import Footer from "../Component/Footer/footer";
import { ThermometerSun } from "lucide-react";
import SingleValueDonutChart from "../Component/Graph/piechart";
import GraphTemperatureDetail from "../Component/Graph/temperaturegraph";
import { useEffect, useState } from "react";


export default function TemperatureDetailPage(){
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
  return (
      <div>
        <Navbar/>
        <main>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-12 my-10 mx-auto" >                 
              <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto">
                  <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg ">
                    <ThermometerSun className="text-[#DA2129]"/> 
                    <p>Temperature</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                  <SingleValueDonutChart value={data ? data.temperature : 0} min={0} max={100} tname="temp"/>
                  </div>
              </div>
          </div>
          <div className="mx-auto my-20 flex flex-col items-center">
            <div className="mb-4 w-full max-w-4xl text-left">
                <span className="text-2xl font-semibold">Real-Time Graph</span>    
            </div>
            <div className="mt-4 w-full flex justify-center">
                 <div className="w-full max-w-4xl">
                   <GraphTemperatureDetail/>
                 </div>
              </div>
            </div>

            <div className="mx-auto my-20 flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">ระดับอุณหภูมิตามเกณฑ์ประเทศไทย </h2>
                  <table className="min-w-100 text-sm text-center border border-gray-300 rounded-lg overflow-hidden shadow-lg divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-[#DA2129] text-white">
                        <th className="px-4 py-2 border-r border-white rounded-tl-lg">อุณหภูมิ (Temperature)</th>
                        <th className="px-4 py-2 rounded-tr-lg">ระดับ (Level)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">≤ 7.9°C</td>
                        <td className="px-4 py-2 text-blue-600 font-semibold"> หนาวจัด(Very Cold)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">8.0 – 15.9°C</td>
                        <td className="px-4 py-2 text-sky-600 font-semibold"> หนาว(Cold) </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">16.0 – 22.9°C</td>
                        <td className="px-4 py-2 text-cyan-600 font-semibold"> เย็น(Cool) </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">23.0 – 34.9°C</td>
                        <td className="px-4 py-2 text-yellow-600 font-semibold"> ปกติ/อบอุ่น(Warm)  </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200">35.0 – 39.9 °C</td>
                        <td className="px-4 py-2 text-orange-600 font-semibold"> ร้อน(Hot)  </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
                        <td className="px-4 py-2 border-r border-gray-200"> ≥ 40°C</td>
                        <td className="px-4 py-2 text-red-600 font-semibold"> ร้อนจัด(Very Hot) </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mx-auto my-20 flex flex-col items-center">
                  <p>Reference: 
                    <a href="https://www.tmd.go.th/info/%E0%B9%80%E0%B8%81%E0%B8%93%E0%B8%91%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8" 
                    className="block break-words text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                     https://www.tmd.go.th/info/
                   </a>
                  </p>
                </div>
        </main>
         <Footer/>
      </div>

    );
  }