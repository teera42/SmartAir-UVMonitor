export default function Footer(){
    return (
        <footer className="bg-[#DA2129] w-full py-4 text-white flex items-center justify-center px-4 text-sm text-center border-b-2 border-gray-50 shadow-lg">
        <p>Copyright © {new Date().getFullYear()} SmartAir & UV Monitor Dashboard. All rights reserved. 
        Srinakharinwirot University | Class CPE468</p>
        </footer>
    );
}