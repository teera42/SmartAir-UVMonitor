const express = require('express');
const http = require('http');
const { SerialPort, ReadlineParser } = require('serialport');
const socketIo = require('socket.io');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5450',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
let sensordatanow = {};
const app = express();
app.use(cors(corsOptions));

// 🔧 เพิ่ม route ให้ path /
app.get('/', (req, res) => {
  res.send('Server is running 123...');
});
app.get('/sensordata',(req,res) =>{
  res.send(sensordatanow);
})

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5450',
    methods: ['GET', 'POST']
  }
});


// Connect Arduino Serial
const port = new SerialPort({
  path: 'COM10', // เปลี่ยนตาม port ของคุณ
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
  console.log('Raw:', data);
  const match = data.match(/Humidity:\s*([\d.]+)%\s*Temperature:\s*([\d.]+)\s*C\s*GasValue:\s*(\d+)\s*QualityAir:\s*(.*?)\s*UV Index:\s*([\d.]+)/);

  if (match) {
    const parsedData = {
      Time: formatdate(),
      humidity: parseFloat(match[1]),
      temperature: parseFloat(match[2]),
      gasValue: parseInt(match[3]),
      qualityAir: match[4],
      uvIndex: parseFloat(match[5])
    };

    sensordatanow = parsedData; 
    io.emit('sensorData', parsedData); 
  }
});


server.listen(30000, () => {
  console.log('Server running on http://localhost:30000');
});
function formatdate(){
  const now = new Date();
  const day = String(now.getDate()).padStart(2,'0');
  const month = String(now.getMonth()+1).padStart(2,'0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return  `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
