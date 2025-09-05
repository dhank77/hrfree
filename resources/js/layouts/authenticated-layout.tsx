import { Flash } from "@/components/flash"
import SidebarLayout from "@/layouts/sidebar-layout"
import type { PropsWithChildren } from "react"

interface AuthenticatedLayoutProps extends PropsWithChildren {
  title?: string
}

export default function AuthenticatedLayout({ children, title }: AuthenticatedLayoutProps) {
  return (
    <div>
      <Flash />
      <SidebarLayout title={title}>
        {children}
      </SidebarLayout>
    </div>
  )
}