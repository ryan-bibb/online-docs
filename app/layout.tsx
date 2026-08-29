import type { Metadata } from 'next'
import './globals.css'
import { Geist } from 'next/font/google'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/components/side-bar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Online Personal Document Application',
  description: 'By echos-100',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SidebarTrigger />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
