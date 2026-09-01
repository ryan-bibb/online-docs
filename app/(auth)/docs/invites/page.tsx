import { prisma } from '@/lib/prisma'
import DocCard from '@/components/doc-card'
import { getCurrentUser } from '@/lib/auth'

export default async function InvitesPage() {
  const user = await getCurrentUser()

  if (!user) return null

  const invites = await prisma.invite.findMany({
    where: { userId: user.userId },
  })

  const documents = await prisma.document.findMany({
    where: { documentId: { in: invites.map((invite) => invite.documentId) } },
  })

  if (documents.length === 0)
    return <div>No documents have been shared with you</div>

  return (
    <div>
      {documents.map((document) => (
        <div key={document.documentId}>
          <DocCard
            title={document.title}
            date={document.updatedAt}
            docId={document.documentId}
          />
        </div>
      ))}
    </div>
  )
}
