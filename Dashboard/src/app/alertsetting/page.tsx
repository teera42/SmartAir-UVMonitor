"use client";
import { useEffect, useState } from "react";
import Footer from "../Component/Footer/footer";
import Navbar from "../Component/Navbar/navbar";
import ToggleSwitch from "../Component/ToggleSwitch/toggleswitch";

export default function AlertSettingPage() {
  const [enableAll, setEnableAll] = useState(true);
  const [airQuality, setAirQuality] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [humidity, setHumidity] = useState(true);
  const [uvIndex, setUvIndex] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("alertSettings");
    if (saved) {
      const data = JSON.parse(saved);
      setEnableAll(data.enableAll);
      setAirQuality(data.airQuality);
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setUvIndex(data.uvIndex);
    }
    
  }, []);
  useEffect(() => {
    const data = {
      enableAll,
      airQuality,
      temperature,
      humidity,
      uvIndex,
    };
    localStorage.setItem("alertSettings", JSON.stringify(data));
  }, [enableAll, airQuality, temperature, humidity, uvIndex]);
console.log
  const handleToggleAll = () => {
    const newValue = !enableAll;
    setEnableAll(newValue);
    setAirQuality(newValue);
    setTemperature(newValue);
    setHumidity(newValue);
    setUvIndex(newValue);
  };
  
  useEffect(() => {
    const allOn = airQuality && temperature && humidity && uvIndex;
    setEnableAll(allOn);
  }, [airQuality, temperature, humidity, uvIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow relative">
        <div className="max-w-3xl mx-auto px-6 py-10 z-40">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Alert Settings
          </h1>

          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Alert Categories
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <SettingItem
              label="Enable All Alerts"
              isOn={enableAll}
              toggle={handleToggleAll}
            />
            <hr />
            <SettingItem
              label="Air Quality Alert"
              isOn={airQuality}
              toggle={() => setAirQuality(!airQuality)}
            />
            <SettingItem
              label="Temperature Alert"
              isOn={temperature}
              toggle={() => setTemperature(!temperature)}
            />
            <SettingItem
              label="Humidity Alert"
              isOn={humidity}
              toggle={() => setHumidity(!humidity)}
            />
            <SettingItem
              label="UV Index Alert"
              isOn={uvIndex}
              toggle={() => setUvIndex(!uvIndex)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SettingItem({
  label,
  isOn,
  toggle,
}: {
  label: string;
  isOn: boolean;
  toggle: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg text-gray-700">{label}</p>
      <ToggleSwitch enabled={isOn} onToggle={toggle} />
    </div>
  );
}
