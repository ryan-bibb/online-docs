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
    where: {
      documentId: { in: invites.map((invite) => invite.documentId) },
    },
  })

  return (
    <div className="flex flex-row flex-wrap gap-5 p-5 w-full border-y">
      {documents.length === 0 && (
        <div>There are currently no documents shared with you</div>
      )}
      {documents.map((document) => (
        <div key={document.documentId}>
          <DocCard
            title={document.title}
            date={document.updatedAt}
            docId={document.documentId}
            userId={document.creatorId}
          />
        </div>
      ))}
    </div>
  )
}
