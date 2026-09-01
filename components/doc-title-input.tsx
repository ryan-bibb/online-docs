'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { updateDocumentTitle } from '@/app/(auth)/docs/actions'
import type { Document } from '@/lib/generated/prisma/client'

export default function DocTitleInput({
  docId,
  title,
  canWrite,
}: {
  docId: Document['documentId']
  title: string
  canWrite: boolean
}) {
  const router = useRouter()
  const [draft, setDraft] = useState(title)

  if (!canWrite) return <>{title}</>

  async function save() {
    const trimmed = draft.trim()
    if (!trimmed || trimmed === title) {
      setDraft(title)
      return
    }

    const result = await updateDocumentTitle({ docId, title: trimmed })
    if (result.success) router.refresh()
    else setDraft(title)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    save()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        className="border-transparent bg-transparent px-0 text-xl font-medium shadow-none focus-visible:border-ring focus-visible:bg-background focus-visible:px-2.5"
      />
    </form>
  )
}
