import { FileText, Home, LogOut, Settings, Star } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { logout } from '@/lib/actions/auth'
import { User } from '@/lib/generated/prisma/client'

const navItems = [
  { title: 'Home', icon: Home, href: '/home' },
  { title: 'All Documents', icon: FileText, href: '/docs' },
  { title: 'Starred', icon: Star, href: '/docs/starred' },
]

// TODO: maybe dont make this retractable. It would make styling in other components easier
export function AppSidebar({ user }: { user: Pick<User, 'userName'> | null }) {
  return (
    <Sidebar>
      <SidebarHeader>RLink Docs</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.href} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {user && (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <span>{user.userName}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form action={logout} className="w-full">
              <SidebarMenuButton render={<button type="submit" />}>
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
