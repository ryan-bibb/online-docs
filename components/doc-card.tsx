import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getFullDate } from '@/lib/utils/date'
import { User, Document } from '@/lib/generated/prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { getUserName } from '@/app/(auth)/docs/actions'

// TODO: add image support ?
export default async function DocCard({
  title,
  date,
  docId,
  userId,
}: {
  title: string
  date: Date
  docId?: Document['documentId']
  userId?: User['userId']
}) {
  const userName = userId ? await getUserName(userId) : ''

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
            {userName && <p>{userName}</p>}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
