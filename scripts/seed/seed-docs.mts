import 'dotenv/config'
import { prisma } from '@/lib/prisma'

// USER SEEDS

// User One
const userOne = await prisma.user.upsert({
  where: { userName: 'ryanbibb34' },
  update: {
    passwordHash: 'password',
    bio: 'Hello, my name is Ryan Bibb and Im a dev',
  },
  create: {
    userName: 'ryanbibb34',
    passwordHash: 'password',
    email: 'ryanbibb34@example.com',
    bio: 'Hello, my name is Ryan Bibb and Im a dev',
  },
})

// User Two
const userTwo = await prisma.user.upsert({
  where: {
    userName: 'RonSwanson',
  },
  update: {
    passwordHash: 'password',
    bio: 'I am a generation hacker',
  },
  create: {
    userName: 'RonSwanson',
    passwordHash: 'password',
    email: 'ronswanson@example.com',
    bio: 'I am a generation hacker',
  },
})

// User Three
const userThree = await prisma.user.upsert({
  where: {
    userName: 'echos-100',
  },
  update: {
    passwordHash: 'password',
    bio: 'Im an alter ego (^.^)',
  },
  create: {
    userName: 'echos-100',
    passwordHash: 'password',
    email: 'echos100@example.com',
    bio: 'Im an alter ego (^.^)',
  },
})

// DOCUMENT SEEDS

// Document One
await prisma.document.create({
  data: {
    title: 'Short Story #3',
    content:
      'And then there was one...one left all alone. He stared up at the stars...',
    creatorId: userOne.userId,
  },
})

// Document Two
await prisma.document.create({
  data: {
    title: 'Personal Thoughts',
    content: 'Why is Python so slow and C++ so fast? Does anyone really know?',
    creatorId: userOne.userId,
  },
})

// Document Three
await prisma.document.create({
  data: {
    title: 'Reading List',
    content:
      '- Designing Data Intensive Applications - Eloquent Javascript - Python For Beginners',
    creatorId: userOne.userId,
  },
})

// Document Four
await prisma.document.create({
  data: {
    title: 'Movie Reviews',
    content: 'Interstellar is really good.',
    creatorId: userOne.userId,
  },
})

// Document Five
await prisma.document.create({
  data: {
    title: 'Book #1 Draft',
    content: 'Chapter 1: The Great Awakenings',
    creatorId: userOne.userId,
  },
})
