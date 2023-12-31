const express=require('express');
const cors=require('cors');
const port=9000;
const app= express();
const database=require('./Database/db');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());
app.use(express.json())

const server=async ()=>{
    await database();
    app.use('/tauth',require('./Routes/T-auth') );
    app.use('/record',require('./Routes/Record') );
    app.use('/sauth',require('./Routes/S-auth') );
app.listen(port,()=>{
    console.log('server is running on port http://localhost',port);
})
}

server();