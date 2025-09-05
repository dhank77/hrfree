import { Flash } from "@/components/flash"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarLabel,
  SidebarProvider,
  SidebarSection,
  SidebarSectionGroup,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePage, router } from "@inertiajs/react"
import type { PropsWithChildren } from "react"
import type { SharedData } from "@/types/shared"
import {
  IconDashboard,
  IconSettings,
  IconPeople,
  IconChartBar,
  IconFolder,
  IconSupport,
  IconLogout,
} from "@intentui/icons"
import { Link } from "@/components/ui/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { home, dashboard, logout, sidebarDemo } from "@/routes"


interface SidebarLayoutProps extends PropsWithChildren {
  title?: string
}

export default function SidebarLayout({ children, title }: SidebarLayoutProps) {
  const { auth } = usePage<SharedData>().props

  const handleLogout = () => {
    router.post(logout.url())
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Flash />
      
      {/* Sidebar */}
      <Sidebar intent="inset" collapsible="dock">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-fg">
              <IconDashboard className="size-4" />
            </div>
            <SidebarLabel>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">HRFree</span>
                <span className="truncate text-xs text-muted-fg">Enterprise</span>
              </div>
            </SidebarLabel>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarSectionGroup>
            <SidebarSection>
              <SidebarItem href={dashboard.url()} isCurrent={window.location.pathname === dashboard.url()}>
                <IconDashboard />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem href={sidebarDemo.url()} isCurrent={window.location.pathname === sidebarDemo.url()}>
                <IconFolder />
                <SidebarLabel>Sidebar Demo</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem href="/users" isCurrent={window.location.pathname.startsWith('/users')}>
                <IconPeople />
                <SidebarLabel>Employees</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem href="/reports" isCurrent={window.location.pathname.startsWith('/reports')}>
                <IconChartBar />
                <SidebarLabel>Reports</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem href="#" isCurrent={false}>
                <IconFolder />
                <SidebarLabel>Documents</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem href="/settings" isCurrent={window.location.pathname.startsWith('/settings')}>
                <IconSettings />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            
            <SidebarSection>
              <SidebarItem href="#" isCurrent={false}>
                <IconSupport />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarSectionGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-2 p-2">
            <Avatar
              src={auth.user?.avatar as string | undefined}
              alt={auth.user?.name || 'User'}
              className="size-8"
            />
            <SidebarLabel>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{auth.user?.name || 'User'}</span>
                <span className="truncate text-xs text-muted-fg">{auth.user?.email || ''}</span>
              </div>
            </SidebarLabel>
            <Button
              size="sm"
              intent="outline"
              onPress={handleLogout}
              aria-label="Logout"
            >
              <IconLogout className="size-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {title && (
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>
          )}
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}