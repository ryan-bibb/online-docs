import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const verifySession = cache(async () => {
  const session = await getSession()
  if (!session?.userId) redirect('/login')
  return session
})

export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session?.userId) return null

  const user = await prisma.user.findUnique({
    where: { userId: session.userId },
    select: { userId: true, userName: true, bio: true, createdAt: true },
  })

  return user
})
