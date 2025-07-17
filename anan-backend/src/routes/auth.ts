import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const readUsers = (): any[] => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return []; 
  }
};

const writeUsers = (users: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password.' });
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
