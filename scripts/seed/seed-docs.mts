import 'dotenv/config'
import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import { prisma } from '@/lib/prisma'

const scryptAsync = promisify(scrypt)
const KEY_LENGTH = 64

// Mirrors lib/password.ts's hashPassword — duplicated here because that
// module imports 'server-only', which this standalone script can't resolve.
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

// USER SEEDS

const seedPasswordHash = await hashPassword('password')

// User One
const userOne = await prisma.user.upsert({
  where: { userName: 'ryanbibb34' },
  update: {
    passwordHash: seedPasswordHash,
    bio: 'Hello, my name is Ryan Bibb and Im a dev',
  },
  create: {
    userName: 'ryanbibb34',
    passwordHash: seedPasswordHash,
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
    passwordHash: seedPasswordHash,
    bio: 'I am a generation hacker',
  },
  create: {
    userName: 'RonSwanson',
    passwordHash: seedPasswordHash,
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
    passwordHash: seedPasswordHash,
    bio: 'Im an alter ego (^.^)',
  },
  create: {
    userName: 'echos-100',
    passwordHash: seedPasswordHash,
    email: 'echos100@example.com',
    bio: 'Im an alter ego (^.^)',
  },
})

// DOCUMENT SEEDS

// Document One
const documentOne = await prisma.document.create({
  data: {
    title: 'Short Story #3',
    content:
      'And then there was one...one left all alone. He stared up at the stars...',
    creatorId: userOne.userId,
  },
})

// Document Two
const documentTwo = await prisma.document.create({
  data: {
    title: 'Personal Thoughts',
    content: 'Why is Python so slow and C++ so fast? Does anyone really know?',
    creatorId: userOne.userId,
  },
})

// Document Three
const documentThree = await prisma.document.create({
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

const testDoc = await prisma.document.create({
  data: {
    title: 'TEST DOC',
    content: 'THIS IS A TEST DOC FOR INVITES',
    creatorId: userOne.userId,
  },
})

// INVITE SEEDS

// RonSwanson has no access to Short Story #3
await prisma.invite.upsert({
  where: {
    userId_documentId: { userId: userTwo.userId, documentId: documentOne.documentId },
  },
  update: { permission: 'NONE' },
  create: {
    permission: 'NONE',
    userId: userTwo.userId,
    documentId: documentOne.documentId,
  },
})

// echos-100 can read Short Story #3
await prisma.invite.upsert({
  where: {
    userId_documentId: {
      userId: userThree.userId,
      documentId: documentOne.documentId,
    },
  },
  update: { permission: 'READ' },
  create: {
    permission: 'READ',
    userId: userThree.userId,
    documentId: documentOne.documentId,
  },
})

// RonSwanson can read Personal Thoughts
await prisma.invite.upsert({
  where: {
    userId_documentId: { userId: userTwo.userId, documentId: documentTwo.documentId },
  },
  update: { permission: 'READ' },
  create: {
    permission: 'READ',
    userId: userTwo.userId,
    documentId: documentTwo.documentId,
  },
})

// echos-100 can read and write Reading List
await prisma.invite.upsert({
  where: {
    userId_documentId: {
      userId: userThree.userId,
      documentId: documentThree.documentId,
    },
  },
  update: { permission: 'WRITE' },
  create: {
    permission: 'WRITE',
    userId: userThree.userId,
    documentId: documentThree.documentId,
  },
})

// TEST DOC

// ryanbibb
await prisma.invite.upsert({
  where: {
    userId_documentId: { userId: userOne.userId, documentId: testDoc.documentId },
  },
  update: { permission: 'READ' },
  create: {
    permission: 'READ',
    userId: userOne.userId,
    documentId: testDoc.documentId,
  },
})

// RonSwanson
await prisma.invite.upsert({
  where: {
    userId_documentId: { userId: userTwo.userId, documentId: testDoc.documentId },
  },
  update: { permission: 'READ' },
  create: {
    permission: 'READ',
    userId: userTwo.userId,
    documentId: testDoc.documentId,
  },
})

// echos-100
await prisma.invite.upsert({
  where: {
    userId_documentId: { userId: userThree.userId, documentId: testDoc.documentId },
  },
  update: { permission: 'WRITE' },
  create: {
    permission: 'WRITE',
    userId: userThree.userId,
    documentId: testDoc.documentId,
  },
})
