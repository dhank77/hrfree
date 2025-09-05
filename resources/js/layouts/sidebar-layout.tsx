import { Flash } from "@/components/flash"
import { Menu } from "@/components/ui/menu"
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
  IconDashboardFill,

  IconSettings,
  IconPeople,
  IconChartBar,
  IconFolder,
  IconSupport,
  IconLogout,
  IconChevronsY,
  IconSettingsFill,
  IconShieldFill,
  IconHeadphonesFill,
} from "@intentui/icons"
import { Avatar } from "@/components/ui/avatar"
import { dashboard, logout } from "@/routes"


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

        <SidebarFooter className="flex flex-row justify-between gap-4 group-data-[state=collapsed]:flex-col">
        <Menu>
          <Menu.Trigger
            className="flex w-full items-center justify-between"
            aria-label="Profile"
          >
            <div className="flex items-center gap-x-2">
              <Avatar
                className="size-8 *:size-8 group-data-[state=collapsed]:size-6 group-data-[state=collapsed]:*:size-6"
                isSquare
                src="https://intentui.com/images/avatar/cobain.jpg"
              />

              <div className="in-data-[collapsible=dock]:hidden text-sm">
                <SidebarLabel>{auth.user.name}</SidebarLabel>
                <span className="-mt-0.5 block text-muted-fg">{auth.user.email}</span>
              </div>
            </div>
            <IconChevronsY data-slot="chevron" />
          </Menu.Trigger>
          <Menu.Content
            className="in-data-[sidebar-collapsible=collapsed]:min-w-56 min-w-(--trigger-width)"
            placement="bottom right"
          >
            <Menu.Section>
              <Menu.Header separator>
                <span className="block">{auth.user.name}</span>
                <span className="font-normal text-muted-fg">{auth.user.email}</span>
              </Menu.Header>
            </Menu.Section>

            <Menu.Item href="#dashboard">
              <IconDashboardFill />
              Dashboard
            </Menu.Item>
            <Menu.Item href="#settings">
              <IconSettingsFill />
              Settings
            </Menu.Item>
            <Menu.Item href="#security">
              <IconShieldFill />
              Security
            </Menu.Item>
            <Menu.Separator />

            <Menu.Item href="#contact">
              <IconHeadphonesFill />
              Customer Support
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item href="#logout">
              <IconLogout />
              Log out
            </Menu.Item>
          </Menu.Content>
        </Menu>
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