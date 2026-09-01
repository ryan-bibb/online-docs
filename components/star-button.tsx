'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { togglePinned } from '@/app/(auth)/docs/actions'
import { Document } from '@/lib/generated/prisma/client'

export default function StarButton({
  docId,
  defaultPinn,
}: {
  docId: Document['documentId']
  defaultPinn: boolean
}) {
  const [pinned, setPinned] = useState(defaultPinn)

  function handleToggle(pinned: boolean) {
    const updatePinn = pinned === true ? false : true

    setPinned(updatePinn)
    togglePinned({ docId, pinned: updatePinn })
  }

  return (
    <div>
      <Button onClick={() => handleToggle(pinned)} variant="ghost">
        <Star
          className={
            pinned === true
              ? 'fill-primary text-primary'
              : 'text-muted-foreground'
          }
        />
      </Button>
    </div>
  )
}
