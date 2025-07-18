// src/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth'; 
import profileRoutes from './routes/profiles';
import session from 'express-session';


const app = express();

app.use(cors({
  origin: 'http://192.168.100.25:3001', 
  credentials: true,
}));

app.use(express.json());

app.use(
  session({
    secret: 'anan-secret', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);


const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.100.25:${PORT}`);
});
