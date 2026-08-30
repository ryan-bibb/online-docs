'use server'

import { prisma } from '@/lib/prisma'
import { Document } from '@/lib/generated/prisma/client'
import { successResult, errorResult } from '@/lib/utils/action-result'
import { verifySession } from '@/lib/auth'

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

export async function saveDocumentContent({
  docId,
  content,
}: {
  docId: Document['documentId']
  content: string
}) {
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
  const document = await prisma.document.update({
    where: { documentId: docId },
    data: { isPinned: pinned },
  })

  if (!document) return errorResult({ message: 'Error pinning document' })
  return successResult({ message: 'Document pinned', data: document })
}
