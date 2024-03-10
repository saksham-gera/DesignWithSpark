import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';
dotenv.config();

import mongoose from 'mongoose';



// MongoDB connection URI
const mongoURI = 'mongodb+srv://ajha94023:3PX3aEsdgLIwknpN@cluster2.mwjrxlb.mongodb.net/?retryWrites=true&w=majority&appName=cluster2';



// Connect to MongoDB
mongoose.connect(mongoURI, {
  
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

const app = express();
app.use(cors());
app.use(express.json({limig: "50mb"}))

app.use('/api/v1/dalle',dalleRoutes);

app.get('/',(req,res)=>{
  res.status(200).json({message : "Hello from SPAM BYTE"})
})

app.listen(5001,()=>console.log('Server has started on port 5001'))