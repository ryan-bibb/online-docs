'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardAction, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'
import { createDocument } from '@/app/(auth)/docs/actions'
import { useRouter } from 'next/navigation'

// TODO: once 'const user = auth()' is wired up swap hardcoded userId with user.user_id
export default function NewDocForm() {
  const [title, setTitle] = useState('')
  const [pinned, setPinned] = useState(false)
  const router = useRouter()
  const content = ''

  return (
    <div className="p-5">
      <Card className="w-200">
        <CardHeader>
          New Document Form
          <CardAction>
            <Button
              variant="ghost"
              onClick={() =>
                pinned === true ? setPinned(false) : setPinned(true)
              }
            >
              <Star
                className={
                  pinned === true
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }
              />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled document #1"
            />
            <Button
              onClick={async () => {
                const result = await createDocument({
                  title,
                  content,
                  userId: 'cmtdkg5dm0000omitt9vlnuf3',
                  pinned,
                })

                if (result.success === true)
                  router.push(`/docs/${result.data.doc_id}`)
              }}
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
