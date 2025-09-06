import { Head } from "@inertiajs/react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"
import type { SharedData } from "@/types"
import { Container } from "@/components/ui/container"

export default function Dashboard({ auth }: SharedData) {
  return (
    <>
      <Head title="Dashboard" />

      <Container className="py-12">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Hello, {auth.user.name}! This is your dashboard.</CardDescription>
        </CardHeader>
      </Container>
    </>
  )
}

Dashboard.layout = (page: React.ReactElement) => <AppLayout children={page} />
