import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, PieChart, Download, Filter, Calendar, ChevronDown, FileText, Users, DollarSign, Clock } from 'lucide-react';
import AdminLayoutNoSidebar from '../components/layout/AdminLayoutNoSidebar';

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [dateRange, setDateRange] = useState('last-30');
  const [department, setDepartment] = useState('all');

  const reportMetrics = [
    {
      id: '1',
      name: 'Monthly Attendance Summary',
      type: 'Attendance',
      lastGenerated: '2025-03-15 09:30 AM',
      status: 'completed',
      size: '2.5 MB'
    },
    {
      id: '2',
      name: 'Department Performance Analysis',
      type: 'Performance',
      lastGenerated: '2025-03-14 02:15 PM',
      status: 'completed',
      size: '4.2 MB'
    },
    {
      id: '3',
      name: 'Employee Leave Report',
      type: 'Leave',
      lastGenerated: '2025-03-14 11:45 AM',
      status: 'pending',
      size: '1.8 MB'
    },
    {
      id: '4',
      name: 'Overtime Analysis',
      type: 'Time & Attendance',
      lastGenerated: '2025-03-13 04:20 PM',
      status: 'completed',
      size: '3.1 MB'
    },
    {
      id: '5',
      name: 'Department Headcount',
      type: 'HR Analytics',
      lastGenerated: '2025-03-13 01:10 PM',
      status: 'failed',
      size: '1.5 MB'
    }
  ];

  const departments = [
    'All Departments',
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations'
  ];

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', icon: Clock },
    { id: 'employee', name: 'Employee Report', icon: Users },
    { id: 'performance', name: 'Performance Report', icon: BarChart },
    { id: 'payroll', name: 'Payroll Report', icon: DollarSign },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const reportSummary = {
    totalReports: reportMetrics.length,
    completed: reportMetrics.filter(r => r.status === 'completed').length,
    pending: reportMetrics.filter(r => r.status === 'pending').length,
    failed: reportMetrics.filter(r => r.status === 'failed').length
  };





  return (
    <AdminLayoutNoSidebar>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
            <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </button>
          </div>

          {/* Report Type Selection */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`${
                    selectedReport === type.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } p-6 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-between`}
                >
                  <div className="flex items-center">
                    <Icon className={`h-6 w-6 ${selectedReport === type.id ? 'text-white' : 'text-gray-400'} mr-3`} />
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 ${selectedReport === type.id ? 'text-white' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                    >
                      <option value="today">Today</option>
                      <option value="last-7">Last 7 Days</option>
                      <option value="last-30">Last 30 Days</option>
                      <option value="this-month">This Month</option>
                      <option value="last-month">Last Month</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept.toLowerCase()}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </button>
              </div>
            </div>
          </div>

          {/* Report Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
                      <dd className="text-lg font-semibold text-gray-900">{reportSummary.totalReports}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                      <dd className="text-lg font-semibold text-gray-900">{reportSummary.completed}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                      <dd className="text-lg font-semibold text-gray-900">{reportSummary.pending}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Failed</dt>
                      <dd className="text-lg font-semibold text-gray-900">{reportSummary.failed}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Generated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportMetrics.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.lastGenerated}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                        <button className="text-indigo-600 hover:text-indigo-900">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutNoSidebar>
  );
};

export default Reports;
