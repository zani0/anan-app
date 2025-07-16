import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const router = Router();

// Path to your users.json file
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// Helper to read users
const readUsers = (): any[] => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return []; // If file doesn't exist or is invalid, return empty array
  }
};

// Helper to write users
const writeUsers = (users: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

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
    password,
    profiles: [],
  };

  users.push(newUser);
  writeUsers(users);

  return res.status(201).json({
    message: 'User created successfully',
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
});

export default router;
