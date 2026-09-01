import DocCard from '@/components/doc-card'
import { DocumentSortMenu } from '@/components/document-sort-menu'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { parseSort, sortDocuments } from '@/lib/document-sort'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const user = await getCurrentUser()

  if (!user) return

  const sort = parseSort((await searchParams).sort)

  const recentDocuments = sortDocuments(
    await prisma.document.findMany({
      where: { creatorId: user.userId },
    }),
    sort
  )

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between p-3">
        <h1>All Documents</h1>
        <DocumentSortMenu sort={sort} />
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
