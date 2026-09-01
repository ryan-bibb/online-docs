import { prisma } from '@/lib/prisma'
import DocCard from '@/components/doc-card'

export default async function StarredPage() {
  const documents = await prisma.document.findMany({
    where: { isPinned: true },
  })

  return (
    <div className="flex flex-col p-5">
      <div className="p-3">
        <h1>Starred Documents</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-5 p-5 w-full border-y">
        {documents.length === 0 && (
          <div>You currently have no starred documents</div>
        )}
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
    </div>
  )
}
