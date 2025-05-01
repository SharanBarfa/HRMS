import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayoutNoSidebar from '../components/layout/AdminLayoutNoSidebar';

const Employees = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Demo data for employees
  const employees = [
    { id: 1, name: 'Sarah Johnson', position: 'Senior Developer', department: 'Engineering', status: 'active', email: 'sarah.j@ermsystem.com', phone: '(555) 123-4567', joinDate: '2023-05-15', img: '' },
    { id: 2, name: 'Mark Wilson', position: 'Marketing Specialist', department: 'Marketing', status: 'active', email: 'mark.w@ermsystem.com', phone: '(555) 234-5678', joinDate: '2023-08-22', img: '' },
    { id: 3, name: 'Emma Thompson', position: 'Sales Representative', department: 'Sales', status: 'active', email: 'emma.t@ermsystem.com', phone: '(555) 345-6789', joinDate: '2024-01-10', img: '' },
    { id: 4, name: 'John Davis', position: 'HR Manager', department: 'HR', status: 'active', email: 'john.d@ermsystem.com', phone: '(555) 456-7890', joinDate: '2022-11-08', img: '' },
    { id: 5, name: 'Linda Garcia', position: 'Financial Analyst', department: 'Finance', status: 'active', email: 'linda.g@ermsystem.com', phone: '(555) 567-8901', joinDate: '2023-03-17', img: '' },
    { id: 6, name: 'Robert Taylor', position: 'Operations Director', department: 'Operations', status: 'active', email: 'robert.t@ermsystem.com', phone: '(555) 678-9012', joinDate: '2022-09-05', img: '' },
    { id: 7, name: 'Michael Brown', position: 'DevOps Engineer', department: 'Engineering', status: 'active', email: 'michael.b@ermsystem.com', phone: '(555) 789-0123', joinDate: '2023-07-19', img: '' },
    { id: 8, name: 'Patricia White', position: 'Content Creator', department: 'Marketing', status: 'leave', email: 'patricia.w@ermsystem.com', phone: '(555) 890-1234', joinDate: '2023-10-30', img: '' },
    { id: 9, name: 'James Miller', position: 'Sales Manager', department: 'Sales', status: 'active', email: 'james.m@ermsystem.com', phone: '(555) 901-2345', joinDate: '2022-06-14', img: '' },
    { id: 10, name: 'Jennifer Moore', position: 'HR Specialist', department: 'HR', status: 'leave', email: 'jennifer.m@ermsystem.com', phone: '(555) 012-3456', joinDate: '2023-11-24', img: '' },
  ];

  // Filter employees based on status
  const filteredEmployees = employees.filter(employee => {
    if (filterStatus === 'all') return true;
    return employee.status === filterStatus;
  });

  // Filter employees based on search term
  const searchedEmployees = filteredEmployees.filter(employee => {
    if (!searchTerm) return true;
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });



  return (
    <AdminLayoutNoSidebar>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="block w-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search employees..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Employee
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-6">
          <div className="sm:hidden">
            <label htmlFor="employee-status" className="sr-only">Select employee status</label>
            <select
              id="employee-status"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="leave">On Leave</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`${
                  filterStatus === 'all'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 text-sm font-medium rounded-md`}
              >
                All Employees
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`${
                  filterStatus === 'active'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 text-sm font-medium rounded-md`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('leave')}
                className={`${
                  filterStatus === 'leave'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 text-sm font-medium rounded-md`}
              >
                On Leave
              </button>
              <button
                onClick={() => setFilterStatus('terminated')}
                className={`${
                  filterStatus === 'terminated'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 text-sm font-medium rounded-md`}
              >
                Terminated
              </button>
            </nav>
          </div>
        </div>

        {/* Employee table */}
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Employee</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contact</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchedEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{employee.name}</div>
                              <div className="text-gray-500">Employee ID: {employee.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{employee.position}</td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{employee.department}</td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                          <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                            employee.status === 'active' ? 'bg-green-100 text-green-800' :
                            employee.status === 'leave' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {employee.status === 'active' ? 'Active' :
                             employee.status === 'leave' ? 'On Leave' : 'Terminated'}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <div>{employee.email}</div>
                          <div>{employee.phone}</div>
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {employee.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{searchedEmployees.length}</span> of{' '}
                <span className="font-medium">{searchedEmployees.length}</span> results
              </p>
            </div>
            <div>
              <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20">
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-indigo-500 bg-indigo-600 focus:z-20">1</a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20">
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutNoSidebar>
  );
};

export default Employees;