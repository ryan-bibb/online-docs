'use client'

import { useState, useTransition } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { saveDocumentContent } from '@/app/(auth)/docs/actions'
import type { Document } from '@/lib/generated/prisma/client'

const Tiptap = ({
  docId,
  content,
}: {
  docId: Document['documentId']
  content: string
}) => {
  const [currentContent, setCurrentContent] = useState(content)
  const [isPending, startTransition] = useTransition()
  // TODO: implement save to unsaved switch logic
  const [saved, setSave] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'p-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setCurrentContent(editor.getHTML())
    },
  })

  const handleSave = () => {
    startTransition(async () => {
      await saveDocumentContent({ docId, content: currentContent })
    })
  }

  return (
    <div className="flex-col gap-3">
      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </Button>

      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
