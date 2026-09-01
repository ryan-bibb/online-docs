import { getCurrentUser } from '@/lib/auth'
import { SettingsPage } from '@/components/settings-page'

export default async function Settings() {
  const user = await getCurrentUser()

  if (!user) return <div>Page not found</div>

  return (
    <div className="border-y">
      <SettingsPage
        userId={user.userId}
        userName={user.userName}
        email={user.email}
        bio={user.bio}
      />
    </div>
  )
}
