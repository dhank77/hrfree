import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Building, Users, Briefcase, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Department {
  id: number;
  name: string;
  code: string;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  employee_id: string;
  email: string;
}

interface Position {
  id: number;
  title: string;
  code: string;
  description?: string;
  department_id: number;
  min_salary?: number;
  max_salary?: number;
  requirements?: string;
  benefits?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  department: Department;
  employees?: Employee[];
  employees_count?: number;
}

interface Props extends SharedData {
  position: Position;
}

export default function ViewPosition({ position }: Props) {
  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Not specified';
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
      <Head title={`Position - ${position.title}`} />
      
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
                <h1 className="text-2xl font-bold text-gray-900">{position.title}</h1>
                <Badge variant={position.is_active ? 'default' : 'secondary'}>
                  {position.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Position Code: {position.code}</p>
            </div>
          </div>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Position
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Position Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Job Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {position.description || 'No description provided.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Department Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{position.department.name}</h3>
                    <p className="text-sm text-gray-500">Code: {position.department.code}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Department
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compensation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Compensation Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Minimum Salary</h4>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(position.min_salary)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Maximum Salary</h4>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(position.max_salary)}
                    </p>
                  </div>
                </div>
                {position.min_salary && position.max_salary && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Salary Range:</strong> {formatCurrency(position.min_salary)} - {formatCurrency(position.max_salary)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Requirements & Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Requirements & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Job Requirements</h4>
                  <div className="text-gray-600 whitespace-pre-line">
                    {position.requirements || 'No specific requirements listed.'}
                  </div>
                </div>
                {position.benefits && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Benefits & Perks</h4>
                    <div className="text-gray-600 whitespace-pre-line">
                      {position.benefits}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Employees */}
            {position.employees && position.employees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Current Employees ({position.employees.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {position.employees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {employee.first_name} {employee.last_name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ID: {employee.employee_id} • {employee.email}
                          </p>
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
                  <span className="text-sm text-gray-600">Current Employees</span>
                  <span className="font-semibold">{position.employees_count || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Department</span>
                  <span className="font-semibold">{position.department.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={position.is_active ? 'default' : 'secondary'} className="text-xs">
                    {position.is_active ? 'Active' : 'Inactive'}
                  </Badge>
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
                  <span className="text-sm text-gray-600">Created</span>
                  <p className="font-medium">{formatDate(position.created_at)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <p className="font-medium">{formatDate(position.updated_at)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Position ID</span>
                  <p className="font-medium font-mono text-xs">{position.id}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Position
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Employee
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

ViewPosition.layout = (page: React.ReactElement) => <AppLayout children={page} />;