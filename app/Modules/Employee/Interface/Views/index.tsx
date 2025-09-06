import { Head, Link } from "@inertiajs/react"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { SharedData } from "@/types"

interface Department {
  id: number
  name: string
  description?: string
  is_active: boolean
}

interface Position {
  id: number
  title: string
  description?: string
  department_id: number
  min_salary?: number
  max_salary?: number
  level?: string
  is_active: boolean
}

interface Employee {
  id: number
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  gender?: string
  address?: string
  department_id?: number
  position_id?: number
  manager_id?: number
  hire_date: string
  termination_date?: string
  employment_type: string
  status: string
  salary?: number
  emergency_contact_name?: string
  emergency_contact_phone?: string
  skills?: string[]
  notes?: string
  department?: Department
  position?: Position
  manager?: Employee
  full_name: string
  is_active: boolean
}

interface EmployeeIndexProps extends SharedData {
  employees: {
    data: Employee[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  departments: Department[]
  positions: Position[]
  filters: {
    search?: string
    department_id?: number
    position_id?: number
    status?: string
  }
}

export default function EmployeeIndex({ employees, departments, positions, filters }: EmployeeIndexProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      terminated: "destructive",
    } as const
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <>
      <Head title="Employees" />

      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground">
              Manage your organization's employees
            </p>
          </div>
          <Link href="/hr/employees/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
            <CardDescription>
              Filter employees by department, position, or status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10"
                  defaultValue={filters.search || ""}
                />
              </div>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="">All Departments</option>
                {departments?.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                )) || []}
              </select>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="">All Positions</option>
                {positions?.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.title}
                  </option>
                )) || []}
              </select>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
            <CardDescription>
              {employees.total} employees found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees?.data?.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(employee.first_name, employee.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{employee.full_name}</h3>
                        {getStatusBadge(employee.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {employee.employee_id} • {employee.email}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        {employee.department && (
                          <span>{employee.department.name}</span>
                        )}
                        {employee.position && (
                          <span>• {employee.position.title}</span>
                        )}
                        {employee.hire_date && (
                          <span>• Hired {new Date(employee.hire_date).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/hr/employees/${employee.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/hr/employees/${employee.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>

            {employees.data.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No employees found</p>
                <Link href="/hr/employees/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Employee
                  </Button>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {employees.last_page > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {((employees.current_page - 1) * employees.per_page) + 1} to{" "}
                  {Math.min(employees.current_page * employees.per_page, employees.total)} of{" "}
                  {employees.total} results
                </p>
                <div className="flex space-x-2">
                  {employees.current_page > 1 && (
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                  )}
                  {employees.current_page < employees.last_page && (
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

EmployeeIndex.layout = (page: React.ReactElement) => <AppLayout children={page} />