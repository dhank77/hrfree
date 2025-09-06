import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Manager {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Props extends SharedData {
  managers: Manager[];
}

export default function CreateDepartment({ managers }: Props) {
  return (
    <>
      <Head title="Create Department" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Department</h1>
              <p className="text-sm text-gray-500">Add a new department to your organization</p>
            </div>
          </div>
        </div>

        <form className="space-y-6">
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
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Human Resources"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Department Code *</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="e.g., HR"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the department's role and responsibilities"
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Management & Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Management & Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manager_id">Department Manager</Label>
                  <Select name="manager_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No manager assigned</SelectItem>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id.toString()}>
                          {manager.first_name} {manager.last_name} ({manager.employee_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Annual Budget</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Building A, Floor 2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="is_active">Active Department</Label>
              </div>
              <p className="text-sm text-gray-500">
                Inactive departments won't appear in employee assignment options
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
              Create Department
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

CreateDepartment.layout = (page: React.ReactElement) => <AppLayout children={page} />;