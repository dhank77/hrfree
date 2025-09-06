import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, User, Mail, Phone, MapPin, Calendar, Building, Briefcase } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  manager_id?: number;
  budget?: number;
  location?: string;
  is_active: boolean;
}

interface Position {
  id: number;
  title: string;
  code: string;
  description?: string;
  department_id: number;
  min_salary?: number;
  max_salary?: number;
  requirements?: string[];
  is_active: boolean;
  department?: Department;
}

interface Manager {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  hire_date: string;
  department_id: number;
  position_id: number;
  manager_id?: number;
  salary?: number;
  status: 'active' | 'inactive' | 'terminated';
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  skills?: string[];
  notes?: string;
  department?: Department;
  position?: Position;
  manager?: Manager;
  full_name?: string;
  is_active?: boolean;
}

interface Props extends SharedData {
  employee: Employee;
}

export default function ViewEmployee({ employee }: Props) {
  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      terminated: 'bg-red-100 text-red-800',
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date?: string) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head title={`Employee - ${employee.full_name || `${employee.first_name} ${employee.last_name}`}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.full_name || `${employee.first_name} ${employee.last_name}`}
              </h1>
              <p className="text-sm text-gray-500">Employee ID: {employee.employee_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusBadge(employee.status)}>
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </Badge>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-sm text-gray-900">
                  {employee.full_name || `${employee.first_name} ${employee.last_name}`}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{employee.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{employee.phone || 'Not provided'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{formatDate(employee.date_of_birth)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{employee.address || 'Not provided'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Employment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{employee.department?.name || 'Not assigned'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Position</label>
                <p className="text-sm text-gray-900">{employee.position?.title || 'Not assigned'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Manager</label>
                <p className="text-sm text-gray-900">
                  {employee.manager ? `${employee.manager.first_name} ${employee.manager.last_name}` : 'No manager assigned'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Hire Date</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{formatDate(employee.hire_date)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Salary</label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{formatCurrency(employee.salary)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                <p className="text-sm text-gray-900">{employee.emergency_contact_name || 'Not provided'}</p>
                {employee.emergency_contact_phone && (
                  <p className="text-sm text-gray-500">{employee.emergency_contact_phone}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Skills</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {employee.skills && employee.skills.length > 0 ? (
                    employee.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Notes</label>
                <p className="text-sm text-gray-900">{employee.notes || 'No notes'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

ViewEmployee.layout = (page: React.ReactElement) => <AppLayout children={page} />;