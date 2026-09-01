'use client'

import { useState, useTransition } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { saveDocumentContent } from '@/app/(auth)/docs/actions'
import type { Document } from '@/lib/generated/prisma/client'
import { LoaderCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// TODO: implement autosaving logic and font, font size, margins, etc
const Tiptap = ({
  docId,
  content,
  canWrite,
  canRead,
}: {
  docId: Document['documentId']
  content: string
  canWrite: boolean
  canRead: boolean
}) => {
  const [currentContent, setCurrentContent] = useState(content)
  const [isPending, startTransition] = useTransition()

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: canWrite,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-content min-h-[60vh] p-6 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setCurrentContent(editor.getHTML())
    },
  })

  if (!canWrite && !canRead) return

  const handleSave = () => {
    startTransition(async () => {
      await saveDocumentContent({ docId, content: currentContent })
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-2">
        <Badge variant={canWrite ? 'default' : 'secondary'}>
          {canWrite ? 'Write' : 'Read'}
        </Badge>
        {canWrite && (
          <Button size="sm" onClick={handleSave} disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        )}
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
