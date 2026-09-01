'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Invite,
  Document,
  User,
  PermissionType,
} from '@/lib/generated/prisma/client'
import { upsertPermission } from '@/app/(auth)/docs/actions'

const PERMISSIONS: { value: PermissionType; label: string }[] = [
  { value: 'NONE', label: 'None' },
  { value: 'READ', label: 'Read Only' },
  { value: 'WRITE', label: 'Read and Write' },
]

export default function InviteModal({
  documentId,
  allUsers,
  invites,
}: {
  documentId: Document['documentId']
  allUsers: User[]
  invites: Invite[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchName, setSearchName] = useState('')

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage access</DialogTitle>
          </DialogHeader>
          <Input
            id="username"
            type="text"
            placeholder="Search people..."
            onChange={(e) => setSearchName(e.target.value)}
          />
          <div className="-mx-4 flex max-h-80 flex-col divide-y divide-border overflow-y-auto border-t">
            {allUsers
              .filter((user) =>
                user.userName.toLowerCase().includes(searchName.toLowerCase()),
              )
              .map((user) => {
                const userInvite = invites.find(
                  (invite) => invite.userId === user.userId,
                )
                return (
                  <div
                    key={user.userId}
                    className="flex items-center justify-between gap-3 px-4 py-2.5"
                  >
                    <span className="min-w-0 truncate text-sm font-medium">
                      {user.userName}
                    </span>
                    <div className="flex shrink-0 gap-1.5">
                      {PERMISSIONS.map(({ value, label }) => {
                        const isActive = userInvite
                          ? userInvite.permission === value
                          : value === 'NONE'
                        return (
                          <Button
                            key={value}
                            size="sm"
                            variant={isActive ? 'default' : 'outline'}
                            onClick={async () => {
                              await upsertPermission({
                                userId: user.userId,
                                documentId,
                                permission: value,
                              })
                              router.refresh()
                            }}
                          >
                            {label}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
