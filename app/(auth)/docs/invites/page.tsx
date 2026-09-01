import { prisma } from '@/lib/prisma'
import DocCard from '@/components/doc-card'
import { DocumentSortMenu } from '@/components/document-sort-menu'
import { getCurrentUser } from '@/lib/auth'
import { parseSort, sortDocuments } from '@/lib/document-sort'

export default async function InvitesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const user = await getCurrentUser()

  if (!user) return null

  const sort = parseSort((await searchParams).sort)

  const invites = await prisma.invite.findMany({
    where: { userId: user.userId, permission: { in: ['READ', 'WRITE'] } },
  })

  const documents = sortDocuments(
    await prisma.document.findMany({
      where: {
        documentId: { in: invites.map((invite) => invite.documentId) },
      },
    }),
    sort
  )

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between p-3">
        <h1>Invites</h1>
        <DocumentSortMenu sort={sort} />
      </div>
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
    </div>
  )
}
