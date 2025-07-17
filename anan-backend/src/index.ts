// src/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth'; 
import profileRoutes from './routes/profiles';
import session from 'express-session';


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your frontend port
  credentials: true,
}));

app.use(express.json());

// 🟩 Session setup
app.use(
  session({
    secret: 'anan-secret', // change to something safe
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);


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
