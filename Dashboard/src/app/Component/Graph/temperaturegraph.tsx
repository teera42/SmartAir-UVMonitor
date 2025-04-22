"use client";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function GraphTemperatureDetail() {
  type sensordata = {
    Time: string;
    humidity: number;
    temperature: number;
    gasValue: number;
    qualityAir: string;
    uvIndex: number;
  };

  const [data, setData] = useState<sensordata[]>([]); // เปลี่ยนเป็น array
  const [latestData, setLatestData] = useState<sensordata | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:30000/sensordata");
        if (!res.ok) throw new Error("Network response was not ok");
        const newData = await res.json();
        setLatestData(newData);
      } catch (error) {
        setLatestData(null);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (latestData) {
        // Ensure prevData is an array before spreading it
        setData((prevData) => {
          const updatedData = Array.isArray(prevData) ? [...prevData, latestData] : [latestData];
          const limitedData = updatedData.slice(-50); 
          localStorage.setItem("sensorData", JSON.stringify(limitedData));
          return updatedData;
        });
      }
    }, [latestData]);
  
    useEffect(() => {
      // On component mount, check if data exists in localStorage and set it in the state
      const storedData = localStorage.getItem("sensorData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }, []);

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#D97706"
            name="อุณหภูมิ °C"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
