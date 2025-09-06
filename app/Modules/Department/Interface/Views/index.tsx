import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Manager {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  manager_id?: number;
  budget?: number;
  location?: string;
  is_active: boolean;
  employees_count?: number;
  positions_count?: number;
  manager?: Manager;
}

interface Props extends SharedData {
  departments: {
    data: Department[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    search?: string;
    status?: string;
    manager_id?: string;
  };
  managers: Manager[];
}

export default function DepartmentIndex({ departments, filters, managers }: Props) {
  const getStatusBadge = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Head title="Departments" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
            <p className="text-sm text-gray-500">
              Manage your organization's departments and their structure
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search departments..."
                    className="pl-10"
                    defaultValue={filters.search}
                  />
                </div>
              </div>
              <Select defaultValue={filters.status}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={filters.manager_id}>
                <SelectTrigger className="w-full sm:w-48">
                  <User className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Managers</SelectItem>
                  {managers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id.toString()}>
                      {manager.first_name} {manager.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Department List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.data.map((department) => (
            <Card key={department.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <p className="text-sm text-gray-500">Code: {department.code}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusBadge(department.is_active)}>
                      {department.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {department.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {department.description}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {department.employees_count || 0} employees
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {formatCurrency(department.budget)}
                    </span>
                  </div>
                </div>

                {department.location && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{department.location}</span>
                  </div>
                )}

                {department.manager && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-1">Manager</p>
                    <p className="text-sm font-medium">
                      {department.manager.first_name} {department.manager.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{department.manager.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {departments.data.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first department.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {departments.last_page > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {((departments.current_page - 1) * departments.per_page) + 1} to{' '}
              {Math.min(departments.current_page * departments.per_page, departments.total)} of{' '}
              {departments.total} departments
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={departments.current_page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={departments.current_page === departments.last_page}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

DepartmentIndex.layout = (page: React.ReactElement) => <AppLayout children={page} />;