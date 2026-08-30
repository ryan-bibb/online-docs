import { AppSidebar } from '@/components/side-bar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { getCurrentUser } from '@/lib/auth'

export default async function AuthLayout({ children }: LayoutProps<'/'>) {
  const user = await getCurrentUser()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
