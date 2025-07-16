import express from "express";
import cors from "cors";
import authRoutes from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  return res.status(201).json({
    message: "User created successfully",
    user: { name, email },
  });
});

const PORT = 3001;
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});


app.use('/api', authRoutes);