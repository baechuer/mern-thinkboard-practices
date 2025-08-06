import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from '../config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middlewares/rateLimiter.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})


