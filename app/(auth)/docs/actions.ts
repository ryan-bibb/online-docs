'use server'

import { prisma } from '@/lib/prisma'
import { Document, User } from '@/lib/generated/prisma/client'
import { successResult, errorResult } from '@/lib/utils/action-result'

export async function createDoc({
  title,
  content,
  userId,
}: {
  title: string
  content: string
  userId: User['user_id']
}) {
  const document = await prisma.document.create({
    data: {
      title,
      content,
      creatorId: userId,
    },
  })

  if (!document) return errorResult({ message: 'Error creating document' })
  return successResult({ message: 'Document created', data: document })
}

export async function saveDocumentContent({
  docId,
  content,
}: {
  docId: Document['doc_id']
  content: string
}) {
  const document = await prisma.document.update({
    where: { doc_id: docId },
    data: { content },
  })

  if (!document) return errorResult({ message: 'Error saving documetn' })
  return successResult({ message: 'Document saved', data: document })
}

export async function togglePinned({
  docId,
  pinned,
}: {
  docId: Document['doc_id']
  pinned: boolean
}) {
  const document = await prisma.document.update({
    where: { doc_id: docId },
    data: { isPinned: pinned },
  })

  if (!document) return errorResult({ message: 'Error pinning document' })
  return successResult({ message: 'Document pinned', data: document })
}
