import DocCard from '@/components/doc-card'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// TODO: add filter options
export default async function Home() {
  const user = await getCurrentUser()

  if (!user) return

  const recentDocuments = await prisma.document.findMany({
    where: { creatorId: user.userId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex flex-col p-5">
      <div className="p-3">
        <h1>All Documents</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-5 p-5 w-full border-y">
        {recentDocuments.length === 0 && (
          <div>You currently have no documents</div>
        )}
        {recentDocuments.map((document) => (
          <div key={document.documentId}>
            <DocCard
              title={document.title}
              date={document.updatedAt}
              docId={document.documentId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
