"use client"
import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

type SingleValueDonutChartProps = {
    value: number;
    min: number;
    max: number;
    tname?: string;
};

const COLORS = ['#DA2129', '#e0e0e0'];

const SingleValueDonutChart: React.FC<SingleValueDonutChartProps> = ({ value, min, max ,tname }) => {
    const [isClient, setIsClient] = useState(false);
    const [typename , setTypeName] = useState(tname);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const percent = ((value - min) / (max - min)) * 100;
    const data = [
        { name: 'Value', value: percent },
        { name: 'Remaining', value: 100 - percent },
    ];
    

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative flex items-center justify-center">
                {isClient && (
                    <PieChart width={180} height={180}>
                        <Pie
                            data={data}
                            startAngle={90}
                            endAngle={450}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                )}
                <div className="absolute text-3xl font-semibold text-gray-700">
                   {tname === 'air'&& value} 
                   {tname === 'temp'&&`${value}°C`  }
                   {tname === 'hum'&&`${value}%`  }
                   {tname === 'uv'&& value }
                </div>
            </div>
            <div className="text-center">
                <span className={`text-sm font-bold mb-2 ${getLevelColor(tname, value)}`}>{levelperiodvalue(tname,value)}</span>
                <div className="bg-gray-50 rounded-lg shadow-md w-full p-4">
                    {tname === 'air' && (<p className="text-sm">Air Quality is classified as {levelperiodvalue(tname,value)}.</p>)}
                    {tname === 'temp' && (<p className="text-sm">Temperature is classified as {levelperiodvalue(tname,value)}.</p>)}
                    {tname === 'hum' && (<p className="text-sm">Humidity is classified as {levelperiodvalue(tname,value)}.</p>)}
                    {tname === 'uv' && (<p className="text-sm">UV Index is classified as {levelperiodvalue(tname,value)}.</p>)}
                </div>
            </div>
        </div>
    );
};

export default SingleValueDonutChart;

function levelperiodvalue(tname?: string, value? : number ): string{

    let levelrange ="";

    if(tname === "air"){
        if(value === undefined) {
            levelrange ="";
        }
        else if(value <= 400){
            levelrange = "Fresh Air"
        }
        else if (value > 400 && value < 1000){
            levelrange = "Bad Air" 
        }
        else{
            levelrange = "Error" 
        }
    }
    else if(tname === "temp"){
        if(value === undefined) {
            levelrange ="";
        }
        else if(value <= 7.9){
            levelrange ="Very Cold";
        }
        else if(value > 7.9 && value <= 15.9){
            levelrange ="Cold";
        }
        else if(value > 15.9 && value <= 22.9 ){
            levelrange = "Cool";
        }
        else if(value > 22.9 && value <= 34.9){
            levelrange = "Warm";
        }
        else if(value > 34.9 && value <=39.9){
            levelrange = "Hot";
        }
        else if(value > 39.9){
            levelrange = "Very Hot"
        }
        else{
            levelrange = "Error"
        }
    }
    else if(tname === "hum"){
        if(value === undefined) {
            levelrange ="";
        }
        else if(value < 30){
            levelrange = "Low";
        }
        else if(value > 30 && value <= 59){
            levelrange =   "Moderate"
        }
        else if(value > 59 && value <= 69){
            levelrange = "High"
        }
        else if(value > 69 && value <=89){
            levelrange = "Very High"
        }
        else if(value > 89){
            levelrange = "Danger"
        }
        else{
            levelrange = "Error"
        }
    }
    else if(tname === "uv"){
        if(value === undefined) {
            levelrange ="";
        }
        else if(value >= 0 && value <=2 ){
            levelrange = "Low"
        }
        else if(value > 2 && value <= 5){
            levelrange = "Moderate"
        }
        else if(value > 5 && value <= 7){
            levelrange = "High"
        }
        else if(value > 7 && value <= 10){
            levelrange = "Very High"
        }
        else if(value > 10){
            levelrange = "Extreme";
        }
        else{
            levelrange = "Error";
        }
    }
    
        return levelrange;
}
function getLevelColor(tname?: string, value?: number): string {
    const level = levelperiodvalue(tname, value);
    switch (level) {
        case 'Fresh Air':
        case 'Moderate':
            return 'text-green-600';
        
        case 'Cool':
            return 'text-cyan-600';
        case 'High':
        case 'Warm':
            return 'text-yellow-600';
        case 'Hot':
        case 'Very High':
            return 'text-orange-600'
        case 'Very Hot':
        case 'Bad Air':
        case 'Danger':
        case 'Extreme':
            return 'text-red-600';
        case 'Cold':
            return 'text-sky-600';
        case 'Very Cold':
        case 'Low':
            return 'text-blue-600';
        default:
            return 'text-gray-600';
    }
}

