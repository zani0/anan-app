import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const router = Router();

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Helper to read users
function readUsers(): any[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read users.json', err);
    return [];
  }
}

// Helper to write users
function writeUsers(users: any[]) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// Sign Up Route
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const users = readUsers();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // 🔒 Reminder: hash this in production
    profiles: [],
  };

  users.push(newUser);
  writeUsers(users);

  return res.status(201).json({ message: 'User created successfully', user: newUser });
});

export default router;
