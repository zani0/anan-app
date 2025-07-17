// src/routes/profiles.ts
import { Router } from 'express';
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

router.post('/create', (req, res) => {
  const { userId, name, age, gender, search } = req.body;

  if (!userId || !name || !age || !gender || search === undefined) {
    return res.status(400).json({ message: 'All profile fields are required.' });
  }

  const users = readUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'Parent user not found.' });
  }

  const newProfile = {
    id: uuidv4(),
    name,
    age,
    gender,
    search,
  };

  user.profiles = user.profiles || [];
  user.profiles.push(newProfile);
  writeUsers(users);

  return res.status(201).json({ message: 'Profile created', profile: newProfile });
});

export default router;
