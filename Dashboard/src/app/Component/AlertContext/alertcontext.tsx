"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface DangerContextType {
  dangerMessage: string | null;
  setDangerMessage: (msg: string | null) => void;
}

const DangerContext = createContext<DangerContextType>({
  dangerMessage: null,
  setDangerMessage: () => {},
});

export const AlertCheckerProvider = ({ children }: { children: ReactNode }) => {
  const [dangerMessage, setDangerMessage] = useState<string | null>(null);
  const [data, setData] = useState<sensordata | null>(null);

  type sensordata = {
    Time: string;
    humidity: number;
    temperature: number;
    gasValue: number;
    qualityAir: string;
    uvIndex: number;
  };

  useEffect(() => {
    const checkDangerValues = (sensor: sensordata | null) => {
      const settings = JSON.parse(localStorage.getItem("alertSettings") || '{"airQuality":true,"temperature":true,"humidity":true,"uvIndex":true}');
  
      const airQualityEnabled = settings.airQuality;
      const temperatureEnabled = settings.temperature;
      const humidityEnabled = settings.humidity;
      const uvIndexEnabled = settings.uvIndex;
  
      let warningMessage = "";
      if (sensor) {
        if (airQualityEnabled && sensor.gasValue > 400) {
          warningMessage += "Bad Air Quality: Warning, high pollution levels in the air.\n";
        }
        if (temperatureEnabled && sensor.temperature > 34.9) {
          warningMessage += "High Temperature: Warning, very hot temperature. Stay cautious outdoors.\n";
        }
        if (humidityEnabled && sensor.humidity > 70) {
          warningMessage += "High Humidity: Warning, high humidity levels may lead to bacteria and mold growth.\n";
        }
        if (uvIndexEnabled && sensor.uvIndex > 7) {
          warningMessage += "Very High UV Index: Warning, very high UV levels. Take extra precautions.\n";
        }
      }
  
      setDangerMessage(warningMessage || null);
    };
  
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:30000/sensordata');
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setData(json);         
        checkDangerValues(json); 
      } catch (error) {
        setData(null);
        setDangerMessage(null);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <DangerContext.Provider value={{ dangerMessage, setDangerMessage }}>
      {children}
    </DangerContext.Provider>
  );
};

export const useDanger = () => useContext(DangerContext);
