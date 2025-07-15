import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// For now, let's use an in-memory array to simulate a database
const users: any[] = [];

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // In real-world apps, always hash passwords!
    profiles: [],
  };

  users.push(newUser);
  return res.status(201).json({ message: 'User created successfully', user: newUser });
});

export default router;
