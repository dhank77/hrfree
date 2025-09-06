import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Building, User, Users, MapPin, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Manager {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  position?: {
    title: string;
  };
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
  created_at: string;
  updated_at: string;
  manager?: Manager;
  employees?: Employee[];
  employees_count?: number;
}

interface Props extends SharedData {
  department: Department;
}

export default function ViewDepartment({ department }: Props) {
  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head title={`Department - ${department.name}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
                <Badge variant={department.is_active ? 'default' : 'secondary'}>
                  {department.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Department Code: {department.code}</p>
            </div>
          </div>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Department
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department Name</label>
                    <p className="text-sm text-gray-900">{department.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department Code</label>
                    <p className="text-sm text-gray-900">{department.code}</p>
                  </div>
                </div>
                {department.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="text-sm text-gray-900">{department.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Management Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Management Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department Manager</label>
                    {department.manager ? (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">
                          {department.manager.first_name} {department.manager.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {department.manager.employee_id} • {department.manager.email}
                        </p>
                        {department.manager.phone && (
                          <p className="text-xs text-gray-500">{department.manager.phone}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No manager assigned</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Annual Budget</label>
                    <p className="text-sm text-gray-900">{formatCurrency(department.budget)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">
                    {department.location || 'Not specified'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Employees */}
            {department.employees && department.employees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Department Employees ({department.employees.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {department.employees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {employee.first_name} {employee.last_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {employee.employee_id} • {employee.email}
                          </p>
                          {employee.position && (
                            <p className="text-xs text-gray-500">{employee.position.title}</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Employees</span>
                  <span className="text-sm font-medium">
                    {department.employees_count || department.employees?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant={department.is_active ? 'default' : 'secondary'} className="text-xs">
                    {department.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Has Manager</span>
                  <span className="text-sm font-medium">
                    {department.manager ? 'Yes' : 'No'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-sm text-gray-900">{formatDate(department.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-sm text-gray-900">{formatDate(department.updated_at)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

ViewDepartment.layout = (page: React.ReactElement) => <AppLayout children={page} />;