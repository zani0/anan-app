import express from "express";
import cors from "cors";
import authRoutes from './routes/auth';
import profileRoutes from './routes/profiles'; 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/profiles', profileRoutes); 

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
