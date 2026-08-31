'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  updateUserName,
  updateEmail,
  updateBio,
} from '@/app/(auth)/docs/actions'
import { Card, CardHeader, CardContent } from './ui/card'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'

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
  const [editUserName, setEditUserName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editBio, setEditBio] = useState(false)

  return (
    <div>
      <Card>
        <CardContent className="flex-col gap-3">
          <div className="flex gap-3">
            {userName}
            <Button onClick={() => setEditUserName(true)}>
              Update username
            </Button>
            {editUserName && (
              <Input
                type="test"
                placeholder={userName}
                value={userName}
                onChange={(e) => {
                  updateUserName({ userId, userName: e.target.value })
                  setEditUserName(false)
                }}
              />
            )}
          </div>
          <div className="flex gap-3">
            {email}
            <Button onClick={() => setEditEmail(true)}>Update Email</Button>
            {editEmail && (
              <Input
                type="text"
                placeholder={email}
                value={email}
                onChange={(e) => {
                  updateEmail({ userId, email: e.target.value })
                  setEditEmail(false)
                }}
              />
            )}
          </div>
          <div className="flex gap-3">
            {bio}
            <Button onClick={() => setEditBio(true)}>Update Bio</Button>
            {editBio && (
              <Input
                type="text"
                placeholder={bio}
                value={bio}
                onChange={(e) => {
                  updateBio({ userId, bio: e.target.value })
                  setEditBio(false)
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
