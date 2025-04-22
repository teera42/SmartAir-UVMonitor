"use client";
import { useEffect, useState } from "react";
import { useDanger } from "../AlertContext/alertcontext";

export default function RouteAlert() {
  const { dangerMessage } = useDanger();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // ถ้ามี dangerMessage แสดง alert ทันที
    if (dangerMessage) {
      setShowAlert(true);
    }
  }, [dangerMessage]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (dangerMessage) {
      // ตั้ง interval ให้ alert กลับมาแสดงทุก 25 วิ
      interval = setInterval(() => {
        setShowAlert(true);
      }, 25000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dangerMessage]);

  const handleClose = () => {
    setShowAlert(false);
  };

  if (!showAlert || !dangerMessage) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-brightness-30 z-40" />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 max-w-md w-full h-auto z-50 bg-white border-2 rounded-lg shadow-lg p-6 flex flex-col">
        <button onClick={handleClose} className="text-black absolute top-4 right-4 text-2xl">
          X
        </button>
        <div className="flex justify-center">
          <img
            src="/Picture/warnningicon.png"
            alt="Warning Icon"
            width={150}
            height={150}
            className="mb-4 "
          />
        </div>
        <div className="mx-auto mb-4">
          <p className="text-3xl text-[#DA2129] font-semibold">Weather Alert</p>
        </div>
        <div className="mx-auto mb-5">
          <p className="text-sm text-gray-700">Detail: {dangerMessage}</p>
        </div>
      </div>
    </>
  );
}
