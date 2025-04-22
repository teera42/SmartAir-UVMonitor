"use client";
import React, { useState, FC } from 'react';

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};
type TabSwitcherProps = {
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
};

const TabButton: FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative z-10 flex-1 text-center px-2 py-2 cursor-pointer transition-colors duration-300 rounded-md focus:outline-none text-xs ${
      isActive ? 'text-black font-semibold' : 'text-gray-500'
    }`}
    role="tab"
  >
    {label}
  </button>
);

const TabSwitcher: FC<TabSwitcherProps> = ({ selectedTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(selectedTab || 'air');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const translateClass = {
    air: 'translate-x-0',
    temp: 'translate-x-full',
     hum:'translate-x-[200%]',
    uv: 'translate-x-[300%]', 
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ml-0">
      <div className="relative flex items-center gap-1 bg-gray-200 rounded-lg border-2 border-gray-200 overflow-hidden">
        {/* Highlight Bar */}
        <div
          className={`absolute top-1 bottom-1 w-1/4 rounded-md bg-white shadow-md transition-transform duration-300 ease-in-out ${
            translateClass[activeTab as keyof typeof translateClass]
          }`}
        ></div>

        {/* Tab Buttons */}
        <TabButton
          label="Air Quality"
          isActive={activeTab === 'air'}
          onClick={() => handleTabClick('air')}
        />
        <TabButton
          label="Temperature"
          isActive={activeTab === 'temp'}
          onClick={() => handleTabClick('temp')}
        />
        <TabButton
          label="Humidity"
          isActive={activeTab === 'hum'}
          onClick={() => handleTabClick('hum')}
        />
        <TabButton
          label="Uv Index"
          isActive={activeTab === 'uv'}
          onClick={() => handleTabClick('uv')}
        />
      </div>
    </div>
  );
};

export default TabSwitcher;
