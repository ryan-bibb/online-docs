import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import StarButton from '@/components/star-button'
import Tiptap from '@/components/tiptap'
import InviteModal from '@/components/invite-modal'
import { getCurrentUser } from '@/lib/auth'
import { getFullDateAndTime } from '@/lib/utils/date'
import DocTitleInput from '@/components/doc-title-input'

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

  const canWrite =
    document.creatorId === user.userId ||
    document.invites.find((invite) => invite.userId === user.userId)
      ?.permission === 'WRITE'
  const canRead =
    document.invites.find((invite) => invite.userId === user.userId)
      ?.permission === 'READ'

  return (
    <div className="flex-1 p-4 md:p-6">
      <Card className="mx-auto h-full w-full max-w-4xl">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">
            <DocTitleInput
              docId={document.documentId}
              title={document.title}
              canWrite={canWrite}
            />
          </CardTitle>
          <CardDescription>
            Last edited {getFullDateAndTime(document.updatedAt)}
          </CardDescription>
          <CardAction className="flex items-center gap-2">
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
          <div className="overflow-hidden rounded-lg border">
            <Tiptap
              docId={document.documentId}
              content={document.content}
              canWrite={canWrite}
              canRead={canRead}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
