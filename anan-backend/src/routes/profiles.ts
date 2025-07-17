// src/routes/profile.ts
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// Helper functions
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

// POST /api/create-profile
router.post('/create-profile', (req, res) => {
  const { userId, name, avatar } = req.body;

  if (!userId || !name || !avatar) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const users = readUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const newProfile = {
    id: uuidv4(),
    name,
    avatar,
  };

  if (!Array.isArray(user.profiles)) {
    user.profiles = [];
  }

  user.profiles.push(newProfile);
  writeUsers(users);

  return res.status(201).json({
    message: 'Profile created',
    profile: newProfile,
    profiles: user.profiles,
  });
});

export default router;
