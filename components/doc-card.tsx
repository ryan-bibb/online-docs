import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getFullDate } from '@/lib/utils/date'
import { Document } from '@/lib/generated/prisma/client'
import Image from 'next/image'
import Link from 'next/link'

// TODO: add image support ?
export default function DocCard({
  title,
  date,
  docId,
}: {
  title: string
  date: Date
  docId?: Document['doc_id']
}) {
  return (
    <Link href={docId ? `/docs/${docId}` : '/docs/new'}>
      <Card className="w-50 h-68 border transition-all duration-200 ease-out hover:-translate-y-1 hover:translate-x-1 hover:border-foreground/40 hover:ring-foreground/40">
        <CardContent>
          <Image
            src="/images/doc-template-img.jpg"
            width={200}
            height={200}
            alt="logo"
          />
        </CardContent>
        <CardFooter>
          <div>
            <p>{title}</p>
            <p>{getFullDate(date)}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
