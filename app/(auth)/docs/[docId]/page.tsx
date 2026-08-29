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

export default async function DocPage({ params }: PageProps<'/docs/[docId]'>) {
  const { docId } = await params
  const document = await prisma.document.findUnique({
    where: { doc_id: docId },
  })

  if (!document) return <div>Page Not Found</div>

  return (
    <div className="flex-1 p-4">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <CardAction>
            <StarButton docId={docId} defaultPinn={document.isPinned} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="border rounded-sm">
            <Tiptap docId={document.doc_id} content={document.content} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
