"use client"
import Image from "next/image";
import Navbar from "./Component/Navbar/navbar";
import Footer from "./Component/Footer/footer";
import TabSwitcher from "./Component/TabButton/tabbutton";
import GraphTempAHumDetail from "./Component/Graph/temperaturegraph";
import GraphUvindexDetail from "./Component/Graph/uvindexgraph";
import GraphAirQualityDetail from "./Component/Graph/airqualitygraph";
import { Droplets, Gauge, Sun, ThermometerSun ,ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import SingleValueDonutChart from "./Component/Graph/piechart";
import GraphHumidityDetail from "./Component/Graph/humiditygraph";
export default function Home() {
  const [selectedTab, setSelectedTab] = useState("air");
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
          <main >
              <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-8 my-10 mx-auto" >
                <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto">
                  <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg ">
                    <Gauge className="text-[#DA2129]"/> 
                    <p>Air Quality</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                  <SingleValueDonutChart value={data ? data.gasValue: 0 } min={0} max={1000} tname="air"/>
                  </div>
                  <div className="bottom-0 text-right flex items-end justify-end">
                  <a href="/airquality" className="text-[#DA2129] cursor-pointer">View</a>
                   <ChevronRight className="text-[#DA2129] cursor-pointer"/>
                  </div>
                </div>

                <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto">
                  <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg ">
                    <ThermometerSun className="text-[#DA2129]"/> 
                    <p>Temperature</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                  <SingleValueDonutChart value={data ? data.temperature : 0} min={0} max={100} tname="temp"/>
                  </div>
                  <div className="bottom-0 text-right flex items-end justify-end">
                  <a href="/temperature" className="text-[#DA2129] cursor-pointer">View</a>
                   <ChevronRight className="text-[#DA2129] cursor-pointer"/>
                  </div>
                </div>

                <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto">
                  <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg ">
                    <Droplets className="text-[#DA2129]"/> 
                    <p>Humidity</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                  <SingleValueDonutChart value={data ? data.humidity : 0 } min={0} max={100} tname="hum"/>
                  </div>
                  <div className="bottom-0 text-right flex items-end justify-end">
                  <a href="/humidity" className="text-[#DA2129] cursor-pointer">View</a>
                   <ChevronRight className="text-[#DA2129] cursor-pointer"/>
                  </div>
                </div>
                
                  <div className="rounded-lg border-gray-50 shadow-sm w-80 h-auto ">
                    <div className="bg-gradient-to-r from-red-100 to-white  flex justify-center items-center gap-2 py-4 rounded-t-lg">
                      <Sun className="text-[#DA2129]"/>
                      <p>UV Index</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 my-3 mx-3">
                    <SingleValueDonutChart value={data ? data.uvIndex : 0} min={0} max={11} tname="uv"/>
                  </div>
                  <div className="bottom-0 text-right flex items-end justify-end">
                  <a href="/uvindex" className="text-[#DA2129] cursor-pointer">View</a>
                   <ChevronRight className="text-[#DA2129] cursor-pointer"/>
                  </div>
                  </div>
              </div>
              <div className="mx-auto my-20 flex flex-col items-center">
                <div className="mb-4 w-full max-w-4xl text-left">
                  <span className="text-2xl font-semibold">Real-Time Graph</span>    
                </div>
                <div className="mx-2 my-2 w-full max-w-4xl text-left">
                <TabSwitcher selectedTab={selectedTab} onTabChange={setSelectedTab} />
                </div>
                  <div className="mt-4 w-full flex justify-center">
                    <div className="w-full max-w-4xl">
                    {selectedTab === "air" && (<>
                    <GraphAirQualityDetail /><div className="bottom-0 text-right flex items-end justify-end">
                                <a href="/airquality" className="text-[#DA2129] flex items-center cursor-pointer">View
                                <ChevronRight className="text-[#DA2129] cursor-pointer"/></a>
                              </div>                    </> )}
                    {selectedTab === "temp" && (<>
                      <GraphTempAHumDetail /> <div className="bottom-0 text-right flex items-end justify-end">
                                  <a href="/temperature" className="text-[#DA2129] flex items-center cursor-pointer">View
                                  <ChevronRight className="text-[#DA2129] cursor-pointer"/></a>
                                </div></>)}
                    {selectedTab === "hum" && (<>
                      <GraphHumidityDetail/> <div className="bottom-0 text-right flex items-end justify-end">
                                  <a href="/humidity" className="text-[#DA2129] flex items-center cursor-pointer">View
                                  <ChevronRight className="text-[#DA2129] cursor-pointer"/></a>
                                </div></>)
                      }
                    {selectedTab === "uv" && (<>
                      <GraphUvindexDetail /> <div className="bottom-0 text-right flex items-end justify-end">
                                <a href="/uvindex" className="text-[#DA2129]  flex items-center cursor-pointer">View
                                <ChevronRight className="text-[#DA2129] cursor-pointer"/></a>
                              </div></>)}
                    </div>
                </div>
                
              </div>
          </main>
      <Footer/>
    </div>
  );
}
