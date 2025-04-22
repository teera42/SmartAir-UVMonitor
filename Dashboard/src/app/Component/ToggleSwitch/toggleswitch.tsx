"use client";
import React from "react";

type ToggleSwitchProps = {
  label?: string;
  enabled: boolean;                   
  onToggle: (state: boolean) => void;  
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onToggle }) => {
  const handleToggle = () => {
    onToggle(!enabled);
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <button
        type="button"
        onClick={handleToggle}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
          enabled ? "bg-[#DA2129]" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
