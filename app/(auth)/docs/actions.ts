'use server'

import { prisma } from '@/lib/prisma'
import { Document, User, PermissionType } from '@/lib/generated/prisma/client'
import { successResult, errorResult } from '@/lib/utils/action-result'
import { verifySession } from '@/lib/auth'

// TODO: organize these into repositories

export async function getUserName(userId: User['userId']) {
  await verifySession()
  return (await prisma.user.findUnique({ where: { userId } }))?.userName
}

export async function createDocument({
  title,
  content,
  pinned,
}: {
  title: string
  content: string
  pinned: boolean
}) {
  const { userId } = await verifySession()

  const document = await prisma.document.create({
    data: {
      title,
      content,
      creatorId: userId,
      isPinned: pinned,
    },
  })

  if (!document) return errorResult({ message: 'Error creating document' })
  return successResult({ message: 'Document created', data: document })
}

// USER SECTION
export async function updateUserName({
  userId,
  userName,
}: {
  userId: User['userId']
  userName: User['userName']
}) {
  // TODO: make sure username is unique -> find a way to implement that before they hit update
  const session = await verifySession()
  if (session.userId !== userId)
    return errorResult({ message: 'You can only update your own account' })

  const user = await prisma.user.update({
    where: { userId },
    data: { userName },
  })

  if (!user) return errorResult({ message: 'Error updating username' })
  return successResult({ message: 'Username updated', data: user })
}

export async function updateEmail({
  userId,
  email,
}: {
  userId: User['userId']
  email: string
}) {
  const session = await verifySession()
  if (session.userId !== userId)
    return errorResult({ message: 'You can only update your own account' })

  const user = await prisma.user.update({ where: { userId }, data: { email } })

  if (!user) return errorResult({ message: 'Error updating email' })
  return successResult({ message: 'Email updated', data: user })
}

export async function updateBio({
  userId,
  bio,
}: {
  userId: User['userId']
  bio: string
}) {
  const session = await verifySession()
  if (session.userId !== userId)
    return errorResult({ message: 'You can only update your own account' })

  // TODO: change default status code here?
  if (bio.length > 200)
    return errorResult({
      message: 'Bio cannot be greater than 200 characters long',
    })

  const user = await prisma.user.update({ where: { userId }, data: { bio } })

  if (!user) return errorResult({ message: 'Error updating bio' })
  return successResult({ message: 'Bio updated', data: user })
}

// DOCUMENT SECTION
async function canWriteDocument(userId: User['userId'], docId: Document['documentId']) {
  const document = await prisma.document.findUnique({ where: { documentId: docId } })
  if (!document) return false
  if (document.creatorId === userId) return true

  const invite = await prisma.invite.findUnique({
    where: { userId_documentId: { userId, documentId: docId } },
  })
  return invite?.permission === 'WRITE'
}

export async function saveDocumentContent({
  docId,
  content,
}: {
  docId: Document['documentId']
  content: string
}) {
  const session = await verifySession()
  if (!(await canWriteDocument(session.userId, docId)))
    return errorResult({ message: 'You do not have write access to this document' })

  const document = await prisma.document.update({
    where: { documentId: docId },
    data: { content },
  })

  if (!document) return errorResult({ message: 'Error saving documetn' })
  return successResult({ message: 'Document saved', data: document })
}

export async function togglePinned({
  docId,
  pinned,
}: {
  docId: Document['documentId']
  pinned: boolean
}) {
  const session = await verifySession()
  if (!(await canWriteDocument(session.userId, docId)))
    return errorResult({ message: 'You do not have access to this document' })

  const document = await prisma.document.update({
    where: { documentId: docId },
    data: { isPinned: pinned },
  })

  if (!document) return errorResult({ message: 'Error pinning document' })
  return successResult({ message: 'Document pinned', data: document })
}

// INVITE SECTION

// TODO: fix these functiosn

export async function upsertPermission({
  userId,
  documentId,
  permission,
}: {
  userId: User['userId']
  documentId: Document['documentId']
  permission: PermissionType
}) {
  const session = await verifySession()
  if (session.userId === userId)
    return errorResult({ message: 'You cannot change your own permission' })

  const document = await prisma.document.findUnique({ where: { documentId } })
  if (!document || document.creatorId !== session.userId)
    return errorResult({ message: 'Only the document owner can invite users' })

  const invite = await prisma.invite.upsert({
    where: { userId_documentId: { userId, documentId } },
    update: { permission, invitedById: session.userId },
    create: { userId, documentId, permission, invitedById: session.userId },
  })
  if (!invite) return errorResult({ message: 'Error updating permission' })
  return successResult({ message: 'Permission updated', data: invite })
}
