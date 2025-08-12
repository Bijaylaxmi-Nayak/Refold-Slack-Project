import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDB } from './database.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import { startScheduler } from './utils/scheduler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// Start DB & Scheduler
initDB().then(() => {
  startScheduler();
  console.log("Database initialized & scheduler running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
