import { prisma } from '@/lib/prisma'
import DocCard from '@/components/doc-card'
import { DocumentSortMenu } from '@/components/document-sort-menu'
import { parseSort, sortDocuments } from '@/lib/document-sort'

export default async function StarredPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const sort = parseSort((await searchParams).sort)

  const documents = sortDocuments(
    await prisma.document.findMany({
      where: { isPinned: true },
    }),
    sort
  )

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between p-3">
        <h1>Starred Documents</h1>
        <DocumentSortMenu sort={sort} />
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
