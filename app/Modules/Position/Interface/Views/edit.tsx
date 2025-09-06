import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Department {
  id: number;
  name: string;
  code: string;
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
  department: Department;
}

interface Props extends SharedData {
  position: Position;
  departments: Department[];
}

export default function EditPosition({ position, departments }: Props) {
  return (
    <>
      <Head title={`Edit Position - ${position.title}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Position</h1>
              <p className="text-sm text-gray-500">Update position information</p>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Position Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={position.title}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Position Code *</Label>
                  <Input
                    id="code"
                    name="code"
                    defaultValue={position.code}
                    placeholder="e.g., SSE"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={position.description || ''}
                  placeholder="Detailed description of the position's responsibilities and requirements"
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Department & Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Department & Classification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department_id">Department *</Label>
                <Select name="department_id" defaultValue={position.department_id.toString()} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id.toString()}>
                        {department.name} ({department.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min_salary">Minimum Salary</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="min_salary"
                      name="min_salary"
                      type="number"
                      defaultValue={position.min_salary || ''}
                      placeholder="0"
                      className="pl-10"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_salary">Maximum Salary</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="max_salary"
                      name="max_salary"
                      type="number"
                      defaultValue={position.max_salary || ''}
                      placeholder="0"
                      className="pl-10"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Leave blank if salary is negotiable or not disclosed
              </p>
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
              <div className="space-y-2">
                <Label htmlFor="requirements">Job Requirements</Label>
                <textarea
                  id="requirements"
                  name="requirements"
                  defaultValue={position.requirements || ''}
                  placeholder="List the key requirements, qualifications, and skills needed for this position"
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <textarea
                  id="benefits"
                  name="benefits"
                  defaultValue={position.benefits || ''}
                  placeholder="Describe the benefits and perks offered with this position"
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Position Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked={position.is_active}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="is_active">Active Position</Label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Inactive positions won't appear in employee assignment options
              </p>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Update Position
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

EditPosition.layout = (page: React.ReactElement) => <AppLayout children={page} />;