import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from "./routes/noteRoutes.js";

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/api/notes",noteRoutes)

app.get('/',(req,res)=>{
    res.send("Welcome Note App Server Is Running")
})

app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})