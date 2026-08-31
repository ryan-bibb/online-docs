'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  updateUserName,
  updateEmail,
  updateBio,
} from '@/app/(auth)/docs/actions'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { User } from '@/lib/generated/prisma/client'

export function SettingsPage({
  userId,
  userName,
  bio,
  email,
}: {
  userId: User['userId']
  userName: string
  bio: string
  email: string
}) {
  const router = useRouter()

  const [editUserName, setEditUserName] = useState(false)
  const [userNameDraft, setUserNameDraft] = useState(userName)
  const [savingUserName, setSavingUserName] = useState(false)

  const [editEmail, setEditEmail] = useState(false)
  const [emailDraft, setEmailDraft] = useState(email)
  const [savingEmail, setSavingEmail] = useState(false)

  const [editBio, setEditBio] = useState(false)
  const [bioDraft, setBioDraft] = useState(bio)
  const [savingBio, setSavingBio] = useState(false)

  async function saveUserName() {
    setSavingUserName(true)
    const result = await updateUserName({ userId, userName: userNameDraft })
    setSavingUserName(false)
    if (result.success) {
      setEditUserName(false)
      router.refresh()
    }
  }

  async function saveEmail() {
    setSavingEmail(true)
    const result = await updateEmail({ userId, email: emailDraft })
    setSavingEmail(false)
    if (result.success) {
      setEditEmail(false)
      router.refresh()
    }
  }

  async function saveBio() {
    setSavingBio(true)
    const result = await updateBio({ userId, bio: bioDraft })
    setSavingBio(false)
    if (result.success) {
      setEditBio(false)
      router.refresh()
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          {/* USERNAME SECTION */}
          <div className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-muted-foreground">
                Username
              </span>
              <span className="text-sm">{userName}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUserNameDraft(userName)
                setEditUserName(true)
              }}
            >
              Update
            </Button>
          </div>
          <Dialog open={editUserName} onOpenChange={setEditUserName}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update username</DialogTitle>
              </DialogHeader>
              <Input
                value={userNameDraft}
                onChange={(e) => setUserNameDraft(e.target.value)}
                placeholder={userName}
                autoFocus
              />
              <DialogFooter showCloseButton>
                <Button disabled={savingUserName} onClick={saveUserName}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* EMAIL SECTION */}
          <div className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-muted-foreground">
                Email
              </span>
              <span className="text-sm">{email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmailDraft(email)
                setEditEmail(true)
              }}
            >
              Update
            </Button>
          </div>
          <Dialog open={editEmail} onOpenChange={setEditEmail}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update email</DialogTitle>
              </DialogHeader>
              <Input
                type="email"
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
                placeholder={email}
                autoFocus
              />
              <DialogFooter showCloseButton>
                <Button disabled={savingEmail} onClick={saveEmail}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* BIO SECTION */}
          <div className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-muted-foreground">
                Bio
              </span>
              <span className="text-sm">{bio}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setBioDraft(bio)
                setEditBio(true)
              }}
            >
              Update
            </Button>
          </div>
          <Dialog open={editBio} onOpenChange={setEditBio}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update bio</DialogTitle>
              </DialogHeader>
              <Input
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value)}
                placeholder={bio}
                autoFocus
              />
              <DialogFooter showCloseButton>
                <Button disabled={savingBio} onClick={saveBio}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
