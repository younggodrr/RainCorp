import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { SECRET } from '../../utils/config';

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive' as const
      }
    }
  });

  if (!user) {
    res
      .status(400)
      .send({ message: 'No account with this username has been registered.' });
    return;
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    res.status(401).send({ message: 'Invalid username or password.' });
    return;
  }

  const payloadForToken = {
    id: user.id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: user.username,
    id: user.id,
    avatar: user.avatar,
    karma: user.postKarma + user.commentKarma,
    role: user.role,
    isVerified: user.isVerified,
    tokens: user.tokens,
  });
};

const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!password || password.length < 6) {
    res
      .status(400)
      .send({ message: 'Password needs to be atleast 6 characters long.' });
    return;
  }

  if (!username || username.length > 20 || username.length < 3) {
    res
      .status(400)
      .send({ message: 'Username character length must be in range of 3-20.' });
    return;
  }

  if (!email || !email.includes('@')) {
    res
      .status(400)
      .send({ message: 'Valid email is required.' });
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: {
            equals: username,
            mode: 'insensitive' as const
          }
        },
        { email }
      ]
    }
  });

  if (existingUser) {
    const field = existingUser.username.toLowerCase() === username.toLowerCase() ? 'username' : 'email';
    res.status(400).send({
      message: `${field === 'username' ? `Username '${username}'` : `Email '${email}'`} is already taken. Choose another one.`,
    });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
    }
  });

  const payloadForToken = {
    id: user.id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: user.username,
    email: user.email,
    id: user.id,
    avatar: user.avatar,
    karma: 0,
    role: user.role,
    isVerified: user.isVerified,
    tokens: user.tokens,
  });
};

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      bio: true,
      role: true,
      postKarma: true,
      commentKarma: true,
      tokens: true,
      isVerified: true,
      verificationBadge: true,
      portfolioUrl: true,
      skills: true,
      experience: true,
      location: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
          clientProjects: true,
          assignedProjects: true,
        }
      },
      createdAt: true,
    }
  });

  if (!user) {
    res.status(404).send({ message: 'User not found.' });
    return;
  }

  res.status(200).json(user);
};

const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user;

  if (id !== userId) {
    res.status(403).send({ message: 'Access denied.' });
    return;
  }

  const {
    bio,
    portfolioUrl,
    skills,
    experience,
    location
  } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      bio,
      portfolioUrl,
      skills,
      experience,
      location,
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      bio: true,
      portfolioUrl: true,
      skills: true,
      experience: true,
      location: true,
    }
  });

  res.status(200).json(updatedUser);
};

export { loginUser, signupUser, getUserProfile, updateUserProfile };