import { Head, Link, useForm } from "@inertiajs/react"
import { ArrowLeft, Save } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import InputError from "@/components/input-error"
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
  full_name: string
}

interface EmployeeCreateProps extends SharedData {
  departments: Department[]
  positions: Position[]
  managers: Employee[]
}

interface EmployeeFormData {
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  gender: string
  address: string
  department_id: string
  position_id: string
  manager_id: string
  hire_date: string
  employment_type: string
  status: string
  salary: string
  emergency_contact_name: string
  emergency_contact_phone: string
  skills: string
  notes: string
}

export default function EmployeeCreate({ departments, positions, managers }: EmployeeCreateProps) {
  const { data, setData, post, processing, errors } = useForm<EmployeeFormData>({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    address: '',
    department_id: '',
    position_id: '',
    manager_id: '',
    hire_date: new Date().toISOString().split('T')[0],
    employment_type: 'full_time',
    status: 'active',
    salary: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    skills: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/hr/employees')
  }

  const filteredPositions = positions.filter(
    (position) => !data.department_id || position.department_id.toString() === data.department_id
  )

  return (
    <>
      <Head title="Create Employee" />

      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/hr/employees">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Employees
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create Employee</h1>
              <p className="text-muted-foreground">
                Add a new employee to your organization
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Basic personal details of the employee
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employee_id">Employee ID *</Label>
                  <Input
                    id="employee_id"
                    value={data.employee_id}
                    onChange={(e) => setData('employee_id', e.target.value)}
                    placeholder="EMP001"
                    required
                  />
                  <InputError message={errors.employee_id} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="john.doe@company.com"
                    required
                  />
                  <InputError message={errors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    placeholder="John"
                    required
                  />
                  <InputError message={errors.first_name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    placeholder="Doe"
                    required
                  />
                  <InputError message={errors.last_name} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                  <InputError message={errors.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={data.date_of_birth}
                    onChange={(e) => setData('date_of_birth', e.target.value)}
                  />
                  <InputError message={errors.date_of_birth} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.gender} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                  />
                  <InputError message={errors.address} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
              <CardDescription>
                Job-related details and organizational structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department_id">Department *</Label>
                  <Select 
                    value={data.department_id} 
                    onValueChange={(value) => {
                      setData('department_id', value)
                      setData('position_id', '') // Reset position when department changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.department_id} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_id">Position *</Label>
                  <Select 
                    value={data.position_id} 
                    onValueChange={(value) => setData('position_id', value)}
                    disabled={!data.department_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPositions?.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id.toString()}>
                          {pos.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.position_id} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="manager_id">Manager</Label>
                  <Select value={data.manager_id} onValueChange={(value) => setData('manager_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers?.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id.toString()}>
                          {manager.full_name} ({manager.employee_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.manager_id} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hire_date">Hire Date *</Label>
                  <Input
                    id="hire_date"
                    type="date"
                    value={data.hire_date}
                    onChange={(e) => setData('hire_date', e.target.value)}
                    required
                  />
                  <InputError message={errors.hire_date} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type *</Label>
                  <Select value={data.employment_type} onValueChange={(value) => setData('employment_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.employment_type} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.status} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    step="0.01"
                    value={data.salary}
                    onChange={(e) => setData('salary', e.target.value)}
                    placeholder="50000.00"
                  />
                  <InputError message={errors.salary} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact & Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact & Additional Information</CardTitle>
              <CardDescription>
                Emergency contact details and additional notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={data.emergency_contact_name}
                    onChange={(e) => setData('emergency_contact_name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                  <InputError message={errors.emergency_contact_name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={data.emergency_contact_phone}
                    onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                    placeholder="+1 (555) 987-6543"
                  />
                  <InputError message={errors.emergency_contact_phone} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  value={data.skills}
                  onChange={(e) => setData('skills', e.target.value)}
                  placeholder="JavaScript, React, Node.js (comma-separated)"
                />
                <InputError message={errors.skills} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => setData('notes', e.target.value)}
                  placeholder="Additional notes about the employee..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={4}
                />
                <InputError message={errors.notes} />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4">
            <Link href="/hr/employees">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Creating...' : 'Create Employee'}
            </Button>
          </div>
        </form>
      </Container>
    </>
  )
}

EmployeeCreate.layout = (page: React.ReactElement) => <AppLayout children={page} />