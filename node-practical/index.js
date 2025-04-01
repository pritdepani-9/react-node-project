import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import  sequelize  from './config/database.js';
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoute.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.sync().then(() => console.log('Database connected.'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
