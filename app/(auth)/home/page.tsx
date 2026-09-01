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
      orderBy: { createdAt: 'desc' },
      where: { creatorId: user.userId },
      take: 5,
    }),
    sort
  )

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between p-3">
        <h1>Recent Documents</h1>
        <DocumentSortMenu sort={sort} />
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
