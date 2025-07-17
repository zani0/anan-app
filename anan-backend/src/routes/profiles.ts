import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

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

router.post('/create-profile', (req: Request, res: Response) => {
  const userId = req.session.userId;
  const { name, age, gender, search, avatar } = req.body;

  if (!userId || !name || !age || !gender || typeof search === 'undefined') {
    return res.status(400).json({ message: 'Missing profile fields' });
  }

  const users = readUsers();
  const user = users.find((u) => u.id === userId); 

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newProfile = {
    id: uuidv4(),
    name,
    age,
    gender,
    search,
    avatar,
  };

  user.profiles = user.profiles || [];
  user.profiles.push(newProfile);
  writeUsers(users);

  return res.status(201).json({
    message: 'Profile created successfully',
    profiles: user.profiles,
  });
});

router.get('/', (req: Request, res: Response) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const users = readUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user.profiles || []);
});

export default router;
