import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import StarButton from '@/components/star-button'
import Tiptap from '@/components/tiptap'
import InviteModal from '@/components/invite-modal'
import { getCurrentUser } from '@/lib/auth'

export default async function DocPage({ params }: PageProps<'/docs/[docId]'>) {
  const { docId } = await params
  const user = await getCurrentUser()

  if (!user) return

  const document = await prisma.document.findUnique({
    where: { documentId: docId },
    include: {
      invites: true,
    },
  })

  if (!document) return <div>Page Not Found</div>

  const users = await prisma.user.findMany({ where: {} })

  return (
    <div className="flex-1 p-4">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <CardAction>
            {document.creatorId === user.userId && (
              <InviteModal
                documentId={document.documentId}
                allUsers={users}
                invites={document.invites}
                userId={user.userId}
              />
            )}
            <StarButton docId={docId} defaultPinn={document.isPinned} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="border rounded-sm">
            <Tiptap docId={document.documentId} content={document.content} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
