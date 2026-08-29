'use server'

import { prisma } from '@/lib/prisma'
import { Document } from '@/lib/generated/prisma/client'

export async function saveDocumentContent({
  docId,
  content,
}: {
  docId: Document['doc_id']
  content: string
}) {
  const success = await prisma.document.update({
    where: { doc_id: docId },
    data: { content },
  })

  return success
}

export async function togglePinned({
  docId,
  pinned,
}: {
  docId: Document['doc_id']
  pinned: boolean
}) {
  const success = await prisma.document.update({
    where: { doc_id: docId },
    data: { isPinned: pinned },
  })

  return success
}
