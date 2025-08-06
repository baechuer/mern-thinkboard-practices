import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from '../config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middlewares/rateLimiter.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173',
    }));
}
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
    // Regex catch-all (matches everything)
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
  }
  

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})


