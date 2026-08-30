import DocCard from '@/components/doc-card'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const recentDocuments = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex flex-col p-5">
      <div className="p-3">
        <h1>All Documents</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-5 p-5 w-full border-y">
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
