import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const renderNavItems = (mobile = false) => {
    const navItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'Employees', path: '/employees', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
      { name: 'Departments', path: '/departments', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { name: 'Time & Attendance', path: '/attendance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { name: 'Performance', path: '/performance', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { name: 'Reports', path: '/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];
  
    return navItems.map((item, index) => (
      <Link
        key={item.name}
        to={item.path}
        className={`${
          item.name === 'Employees'
            ? 'bg-indigo-800 text-white'
            : 'text-indigo-100 hover:bg-indigo-600'
        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
      >
        <svg
          className="flex-shrink-0 w-6 h-6 mr-3 text-indigo-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={item.icon}
          />
        </svg>
        {item.name}
      </Link>
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-40 md:hidden`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col flex-1 w-full max-w-xs bg-indigo-700">
          <div className="absolute top-0 right-0 pt-2 -mr-12">
            <button
              className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-white">ERM System</span>
            </div>
            <nav className="px-2 mt-5 space-y-1">
              {renderNavItems(true)}
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 border-t border-indigo-800">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-800 rounded-full"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs font-medium text-indigo-200">View profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 min-h-0 bg-indigo-700">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-xl font-bold text-white">ERM System</span>
              </div>
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-indigo-700">
                {renderNavItems()}
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 border-t border-indigo-800">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-800 rounded-full"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs font-medium text-indigo-200">View profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    className="block w-full h-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search employees..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Employee
                </button>
              </div>
            </div>

            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {/* Filter tabs */}
              <div className="mt-4 sm:mt-6">
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
              <div className="flex flex-col mt-8">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employees;