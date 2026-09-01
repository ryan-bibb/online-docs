import DocCard from '@/components/doc-card'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) return

  const recentDocuments = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    where: { creatorId: user.userId },
    take: 5,
  })

  return (
    <div className="flex flex-col p-5">
      <div className="p-3">
        <h1>Recent Documents</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-5 p-5 w-full border-y">
        <DocCard title="Blank Doc" date={new Date()} />
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
