import express from 'express';
import dalleRoutes from './routes/dalleRoutes.js'; // Adjust the path as necessary
import UserRoutes from './routes/UserRoutes.js'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();
const app = express();
// MongoDB connection URI
const mongoURI = process.env.MONGO_URL;

app.use(bodyParser.urlencoded({extended: true}));

// Connect to MongoDB
mongoose.connect(mongoURI, {

}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.log('Error connecting to MongoDB Atlas:', err.message);
});

const port = 5001;
const corsOptions = {
  origin: 'https://design-with-spark.vercel.app/',
  optionsSuccessStatus: 200
}
// Use the routes
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/dalle', dalleRoutes);
app.use('/users',UserRoutes);



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
