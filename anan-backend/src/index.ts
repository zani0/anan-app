// src/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth'; 
import profileRoutes from './routes/profiles';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', profileRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
