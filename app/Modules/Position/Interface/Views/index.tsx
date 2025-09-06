import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2, Briefcase, DollarSign, Users } from 'lucide-react';
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
  is_active: boolean;
  created_at: string;
  department: Department;
  employees_count?: number;
}

interface Props extends SharedData {
  positions: {
    data: Position[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  departments: Department[];
  filters: {
    search?: string;
    department?: string;
    status?: string;
  };
}

export default function PositionIndex({ positions, departments, filters }: Props) {
  const formatSalary = (amount: number | null | undefined) => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSalaryRange = (position: Position) => {
    const min = formatSalary(position.min_salary);
    const max = formatSalary(position.max_salary);
    
    if (min && max) {
      return `${min} - ${max}`;
    } else if (min) {
      return `From ${min}`;
    } else if (max) {
      return `Up to ${max}`;
    }
    return 'Not specified';
  };

  return (
    <>
      <Head title="Positions" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Positions</h1>
            <p className="text-sm text-gray-500">
              Manage job positions and their requirements
            </p>
          </div>
          <Button asChild>
            <Link href="/positions/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Link>
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
                    placeholder="Search positions..."
                    defaultValue={filters.search || ''}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select defaultValue={filters.department || ''}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id.toString()}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={filters.status || ''}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Positions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.data.map((position) => (
            <Card key={position.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                      {position.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Code: {position.code}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/positions/${position.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/positions/${position.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={position.is_active ? 'default' : 'secondary'}>
                    {position.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {position.department.name}
                  </span>
                </div>
                
                {position.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {position.description}
                  </p>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{getSalaryRange(position)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{position.employees_count || 0} employees</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Created {new Date(position.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/positions/${position.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/positions/${position.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {positions.data.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-500 mb-4">
                {filters.search || filters.department || filters.status
                  ? 'Try adjusting your search criteria'
                  : 'Get started by creating your first position'}
              </p>
              <Button asChild>
                <Link href="/positions/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Position
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {positions.last_page > 1 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {((positions.current_page - 1) * positions.per_page) + 1} to{' '}
                  {Math.min(positions.current_page * positions.per_page, positions.total)} of{' '}
                  {positions.total} positions
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={positions.current_page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={positions.current_page === positions.last_page}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

PositionIndex.layout = (page: React.ReactElement) => <AppLayout children={page} />;