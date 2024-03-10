import express from 'express';
import dalleRoutes from './routes/dalleRoutes.js'; // Adjust the path as necessary
import cors from 'cors';

const app = express();
const port = 5001;
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
// Use the routes
app.use(cors(corsOptions));
app.use('/dalle', dalleRoutes);



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
