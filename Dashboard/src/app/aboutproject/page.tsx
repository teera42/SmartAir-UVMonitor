import Footer from "../Component/Footer/footer";
import Navbar from "../Component/Navbar/navbar";
import Image from "next/image";
export default function AboutProjectpage(){
    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>
            <main>
            <div className="flex flex-col justify-center items-center mx-auto my-5">
                <h1 className="text-4xl font-bold text-center my-8">About Project</h1>
                <div className="py-6 px-4 max-w-3xl mx-auto text-center flex flex-wrap justify-center gap-5 items-center">
                    <Image src="/Picture/aboutproject_1.jpg" alt="" width={300} height={300}/>
                    <Image src="/Picture/aboutproject_2.jpg" alt="" width={300} height={300}/>
                </div>
                <div className="py-6 px-4 max-w-3xl mx-auto text-center">
                    <span className="text-2xl font-bold text-center my-8">Electrical Circuit Diagram </span>
                </div>
                <div className="py-6 px-4 max-w-3xl mx-auto text-center">
                    <Image src="/Picture/ecd.png" alt="" width={300} height={300}/>
                </div>
                <div className="py-6 px-4 max-w-3xl mx-auto text-center">
                <p className="text-xl font-semibold leading-relaxed text-gray-800">
                    <span className="text-primary font-bold">SmartAir&UvMonitor</span> คือระบบที่ใช้สำหรับตรวจสอบ
                    <span className="text-blue-600 font-medium"> คุณภาพอากาศ</span>,
                    <span className="text-red-500 font-medium"> อุณหภูมิ</span>,
                    <span className="text-green-600 font-medium"> ความชื้น</span> และ
                    <span className="text-purple-600 font-medium"> ระดับรังสีอัลตราไวโอเลต (UV)</span>
                    แบบเรียลไทม์
                </p>
                </div>
                <div className="py-6 px-4 max-w-3xl mx-auto text-center">
                    <span className="text-2xl font-bold text-center my-8">Hardware Devices</span> 
                   <div className="flex justify-between items-center gap-5">
                    <div className="relative group w-fit">
                        <Image 
                        src="/Picture/arduinounor3.jpg" 
                        alt="Arduino UNO R3" 
                        width={180} 
                        height={180} 
                        className="rounded-md"
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                             Arduino UNO R3
                        </div>
                    </div>

                        <div className="relative group w-fit">
                        <Image src="/Picture/mq135.jpg" alt="MQ135(Gas Sensor)" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                             MQ135(Gas Sensor)
                            </div>
                        </div>

                        <div className="relative group w-fit">
                            <Image src="/Picture/lcd.jpg" alt="LCD Display(I2C)" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            LCD Display(I2C)
                            </div>
                        </div>

                        <div className="relative group w-fit">
                        <Image src="/Picture/i2c.jpg" alt="I2C Converter(PCF8574)" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            I2C Converter(PCF8574)
                            </div>
                        </div>
                        <div className="relative group w-fit">
                        <Image src="/Picture/breadboard.jpg" alt="Bread Board" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Bread Board
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5">
                        <div className="relative group w-fit">
                        <Image src="/Picture/dht22.jpg" alt="DHT22(Temp & Humidity Sensor)" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            DHT22(Temp & Humidity Sensor)
                            </div>
                        </div>

                        <div className="relative group w-fit">
                        <Image src="/Picture/connectwire.jpg" alt="Connecting Wires" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Connecting Wires 
                            </div>
                        </div>

                        <div className="relative group w-fit">
                        <Image src="/Picture/uvsensor.jpg" alt="UV Sensor Module S12SD" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            UV Sensor Module S12SD
                            </div>
                        </div>
                    
                        <div className="relative group w-fit">
                        <Image src="/Picture/usb.jpg" alt="USB Cable" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            USB Cable
                            </div>
                        </div>
                    </div>

                </div>  
                <div className="py-6 px-4 max-w-3xl mx-auto text-center">
                    <span className="text-2xl font-bold text-center my-8">Software Tools</span>
                    <div className="flex justify-between items-center gap-5">
                    <div className="relative group w-fit">
                        <Image src="/Picture/htmlcssjs.jpg" alt="HTML CSS JavaScript Language" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            HTML CSS JavaScript Language
                            </div>
                        </div>
                        <div className="relative group w-fit">
                        <Image src="/Picture/react.jpg" alt="React Nextjs" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            React Nextjs
                            </div>
                        </div>
                        <div className="relative group w-fit">
                        <Image src="/Picture/node.png" alt="Nodejs Express" width={180} height={180}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Nodejs Express
                            </div>
                        </div>
                    </div> 
                    <div className="flex justify-between items-center gap-5">
                      <div className="relative group w-fit">
                        <Image src="/Picture/c.png" alt="C Language" width={150} height={150}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            C Language
                            </div>
                        </div>
                          
                      <div className="relative group w-fit">
                        <Image src="/Picture/vscode.png" alt="Vistual studio code" width={150} height={150}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Vistual studio code
                            </div>
                        </div>
                        <div className="relative group w-fit">
                        <Image src="/Picture/arduinoide.png" alt="Arduino IDE" width={150} height={150}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                           Arduino IDE
                            </div>
                        </div>

                        <div className="relative group w-fit">
                        <Image src="/Picture/typescript.png" alt="TypeScript" width={150} height={150}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            TypeScript Language
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
            <Footer/>
        </div>
    );
}