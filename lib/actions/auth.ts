'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/password'
import { createSession, deleteSession } from '@/lib/session'

export type AuthFormState =
  | {
      errors?: {
        userName?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

function validateCredentials(
  userName: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) {
  const errors: NonNullable<AuthFormState>['errors'] = {}

  if (typeof userName !== 'string' || userName.trim().length < 1) {
    errors.userName = ['Username is required.']
  } else if (userName.length > 30) {
    errors.userName = ['Username must be 30 characters or fewer.']
  }

  if (typeof password !== 'string' || password.length < 8) {
    errors.password = ['Password must be at least 8 characters long.']
  }

  return Object.keys(errors).length > 0 ? errors : null
}

export async function signup(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const userName = formData.get('userName')
  const email = formData.get('email')
  const password = formData.get('password')

  const errors = validateCredentials(userName, password) ?? {}

  if (typeof email !== 'string' || !email.includes('@')) {
    errors.email = ['Please enter a valid email.']
  }

  if (Object.keys(errors).length > 0) return { errors }

  const existingUser = await prisma.user.findUnique({
    where: { userName: userName as string },
  })
  if (existingUser) {
    return { errors: { userName: ['That username is already taken.'] } }
  }

  const passwordHash = await hashPassword(password as string)

  const user = await prisma.user.create({
    data: { userName: userName as string, email: email as string, passwordHash, bio: '' },
  })

  await createSession(user.userId)
  redirect('/home')
}

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const userName = formData.get('userName')
  const password = formData.get('password')

  const errors = validateCredentials(userName, password)
  if (errors) return { errors }

  const user = await prisma.user.findUnique({
    where: { userName: userName as string },
  })

  const validPassword = user ? await verifyPassword(password as string, user.passwordHash) : false

  if (!user || !validPassword) {
    return { message: 'Invalid username or password.' }
  }

  await createSession(user.userId)
  redirect('/home')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
