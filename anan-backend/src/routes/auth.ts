// src/routes/auth.ts
import { Router } from 'express';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const router = Router();
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const readUsers = (): any[] => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
    profiles: [],
  };

  users.push(newUser);
  writeUsers(users);

  return res.status(201).json({ message: 'User registered', user: newUser });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profiles: user.profiles || [],
    },
  });
});

export default router;
