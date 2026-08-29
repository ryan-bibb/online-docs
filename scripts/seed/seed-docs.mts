import 'dotenv/config'
import { prisma } from '@/lib/prisma'

// USER SEEDS

// User One
const userOne = await prisma.user.upsert({
  where: { user_name: 'ryanbibb34' },
  update: {
    password_hash: 'password',
    bio: 'Hello, my name is Ryan Bibb and Im a dev',
  },
  create: {
    user_name: 'ryanbibb34',
    password_hash: 'password',
    bio: 'Hello, my name is Ryan Bibb and Im a dev',
  },
})

// User Two
const userTwo = await prisma.user.upsert({
  where: {
    user_name: 'RonSwanson',
  },
  update: {
    password_hash: 'password',
    bio: 'I am a generation hacker',
  },
  create: {
    user_name: 'RonSwanson',
    password_hash: 'password',
    bio: 'I am a generation hacker',
  },
})

// User Three
const userThree = await prisma.user.upsert({
  where: {
    user_name: 'echos-100',
  },
  update: {
    password_hash: 'password',
    bio: 'Im an alter ego (^.^)',
  },
  create: {
    user_name: 'echos-100',
    password_hash: 'password',
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
    creatorId: userOne.user_id,
  },
})

// Document Two
await prisma.document.create({
  data: {
    title: 'Personal Thoughts',
    content: 'Why is Python so slow and C++ so fast? Does anyone really know?',
    creatorId: userOne.user_id,
  },
})

// Document Three
await prisma.document.create({
  data: {
    title: 'Reading List',
    content:
      '- Designing Data Intensive Applications - Eloquent Javascript - Python For Beginners',
    creatorId: userOne.user_id,
  },
})

// Document Four
await prisma.document.create({
  data: {
    title: 'Movie Reviews',
    content: 'Interstellar is really good.',
    creatorId: userOne.user_id,
  },
})

// Document Five
await prisma.document.create({
  data: {
    title: 'Book #1 Draft',
    content: 'Chapter 1: The Great Awakenings',
    creatorId: userOne.user_id,
  },
})
