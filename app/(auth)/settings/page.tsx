import { getCurrentUser } from '@/lib/auth'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { SettingsPage } from '@/components/settings-page'

export default async function Settings() {
  const user = await getCurrentUser()

  if (!user) return <div>Page not found</div>

  return (
    <div>
      <Card>
        <CardHeader>Settings</CardHeader>
        <CardContent>
          <SettingsPage
            userId={user.userId}
            userName={user.userName}
            email="ryanbibb34@gmail.com"
            bio={user.bio}
          />
        </CardContent>
      </Card>
    </div>
  )
}
