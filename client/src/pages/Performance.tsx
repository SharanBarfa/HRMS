import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
import { BarChart3, Target, TrendingUp, Award, Star, Filter, Search, ChevronDown } from 'lucide-react';

interface PerformanceMetric {
  id: number;
  name: string;
  department: string;
  role: string;
  rating: number;
  goals: {
    completed: number;
    total: number;
  };
  attendance: number;
  productivity: number;
  lastReview: string;
  status: 'excellent' | 'good' | 'average' | 'needs-improvement';
}


const Performance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('q1-2025');

  const performanceData: PerformanceMetric[] = [
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      role: "Senior Developer",
      rating: 4.8,
      goals: { completed: 12, total: 15 },
      attendance: 98,
      productivity: 95,
      lastReview: "2025-03-15",
      status: "excellent"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      role: "Marketing Manager",
      rating: 4.5,
      goals: { completed: 8, total: 10 },
      attendance: 95,
      productivity: 92,
      lastReview: "2025-03-10",
      status: "good"
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Sales",
      role: "Sales Executive",
      rating: 3.5,
      goals: { completed: 15, total: 25 },
      attendance: 85,
      productivity: 78,
      lastReview: "2025-03-05",
      status: "average"
    },
    {
      id: 4,
      name: "Emily Davis",
      department: "HR",
      role: "HR Specialist",
      rating: 4.2,
      goals: { completed: 7, total: 8 },
      attendance: 97,
      productivity: 90,
      lastReview: "2025-03-01",
      status: "good"
    },
    {
      id: 5,
      name: "David Wilson",
      department: "Engineering",
      role: "Software Engineer",
      rating: 3.2,
      goals: { completed: 5, total: 12 },
      attendance: 88,
      productivity: 75,
      lastReview: "2025-02-28",
      status: "needs-improvement"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'average':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs-improvement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredData = performanceData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(performanceData.map(emp => emp.department)));

  const performanceSummary = {
    excellentPerformers: performanceData.filter(e => e.status === 'excellent').length,
    averageRating: (performanceData.reduce((acc, curr) => acc + curr.rating, 0) / performanceData.length).toFixed(1),
    goalCompletionRate: Math.round((performanceData.reduce((acc, curr) => acc + (curr.goals.completed / curr.goals.total) * 100, 0) / performanceData.length)),
    averageProductivity: Math.round(performanceData.reduce((acc, curr) => acc + curr.productivity, 0) / performanceData.length)
  };
  
  
   
  
  

  return (
    <div className="flex h-screen bg-gray-100">

 
      


      <div className="flex flex-col flex-1 w-0 overflow-hidden">
  
        

        {/* Main content area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
          <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Employee Performance</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="q1-2025">Q1 2025</option>
                <option value="q4-2024">Q4 2024</option>
                <option value="q3-2024">Q3 2024</option>
                <option value="q2-2024">Q2 2024</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Generate Report
            </button>
          </div>
        </div>

        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Top Performers</dt>
                    <dd className="text-lg font-semibold text-gray-900">{performanceSummary.excellentPerformers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                    <dd className="text-lg font-semibold text-gray-900">{performanceSummary.averageRating}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Goal Completion</dt>
                    <dd className="text-lg font-semibold text-gray-900">{performanceSummary.goalCompletionRate}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Productivity</dt>
                    <dd className="text-lg font-semibold text-gray-900">{performanceSummary.averageProductivity}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 min-w-0 max-w-lg">
                <div className="relative rounded-md shadow-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search by name or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Goals
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productivity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${getRatingColor(employee.rating)}`}>
                        {employee.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-indigo-600 rounded-full"
                            style={{ width: `${(employee.goals.completed / employee.goals.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {employee.goals.completed}/{employee.goals.total}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${getProgressBarColor(employee.productivity)}`}
                            style={{ width: `${employee.productivity}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {employee.productivity}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;