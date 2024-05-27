import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models';
import validator from 'validator';
import errorHandler from './errorHandler';

const router = express.Router();

// JWT
const createToken = (_id: string): string => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' });
};

// Login
router.post('/login', async (req: Request, res: Response, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }
  
  try {
    const user = await User.findOne({ email });
    const matchPassword = await bcrypt.compare(password, user.password || '');
    
    if (!user || !matchPassword) {
      throw new Error('Incorrect email or Incorrect password');
    }

    const token = createToken(user._id.toString());
    res.cookie('user', JSON.stringify({name: user.name, roles: user.roles, token}), { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ user });
    
  } catch (error) {
    next(error);
  }
});

// Signup
router.post('/create', async (req: Request, res: Response, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const errors: string[] = [];
  
  if (!validator.isEmail(email)) {
    errors.push('Input a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    errors.push('Password is not strong enough');
  }

  if (password !== passwordConfirm) {
      errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
    
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ errors: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEmail = email.toLowerCase();
    const user = await User.create({
      name,
      email: userEmail,
      password: hashedPassword,
      roles: ['customer']
    });

    const token = createToken(user._id.toString());

    res.cookie('user', JSON.stringify({name, roles: ['customer'], token}), { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

// get user
router.get('/me', async (req: Request, res: Response, next) => {
  const token = req.cookies.user;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(JSON.parse(token).token, process.env.SECRET as string) as { userId: string };
    const user = await User.findById(decoded.userId);
    res.status(200).json({ user });  
  } catch (error) {
    next(error)
  }
})

// Logout
router.get('/logout', async (req: Request, res: Response, next) => {
  try {
    res.cookie('user', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
})

// Error handling middleware should be the last piece of middleware added
router.use(errorHandler);
export default router;
