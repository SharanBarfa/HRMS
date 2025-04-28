import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Departments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Demo data for departments
  const departments = [
    { 
      id: 1, 
      name: 'Engineering', 
      manager: 'Sarah Johnson', 
      employeeCount: 78, 
      budget: '$750,000',
      projects: 14,
      description: 'Software development, infrastructure management, and technical support.'
    },
    { 
      id: 2, 
      name: 'Marketing', 
      manager: 'Mark Wilson', 
      employeeCount: 45, 
      budget: '$450,000',
      projects: 8,
      description: 'Brand management, digital marketing, and market research.'
    },
    { 
      id: 3, 
      name: 'Sales', 
      manager: 'Emma Thompson', 
      employeeCount: 62, 
      budget: '$680,000',
      projects: 6,
      description: 'Client acquisition, account management, and sales operations.'
    },
    { 
      id: 4, 
      name: 'HR', 
      manager: 'John Davis', 
      employeeCount: 15, 
      budget: '$220,000',
      projects: 5,
      description: 'Talent acquisition, employee relations, and organizational development.'
    },
    { 
      id: 5, 
      name: 'Finance', 
      manager: 'Linda Garcia', 
      employeeCount: 25, 
      budget: '$350,000',
      projects: 4,
      description: 'Financial analysis, accounting, and budget management.'
    },
    { 
      id: 6, 
      name: 'Operations', 
      manager: 'Robert Taylor', 
      employeeCount: 20, 
      budget: '$280,000',
      projects: 7,
      description: 'Process optimization, supply chain management, and business operations.'
    }
  ];

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department => {
    if (!searchTerm) return true;
    return (
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderNavItems = () => {
    const navItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'Employees', path: '/employees', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
      { name: 'Departments', path: '/departments', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { name: 'Time & Attendance', path: '/attendance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { name: 'Performance', path: '/performance', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { name: 'Reports', path: '/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];
  
    return navItems.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className={`${
          item.name === 'Departments'
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
                    placeholder="Search departments..."
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
                <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Department
                </button>
              </div>
            </div>

            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {/* Department cards grid */}
              <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDepartments.map((department) => (
                  <div key={department.id} className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow">
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
                        <span className="flex items-center px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                          {department.employeeCount} employees
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{department.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Manager</p>
                            <p className="text-sm text-gray-500">{department.manager}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Budget</p>
                            <p className="text-sm text-gray-500">{department.budget}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Projects</p>
                            <p className="text-sm text-gray-500">{department.projects}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 space-x-3">
                        <button className="inline-flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Details
                        </button>
                        <button className="inline-flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Team
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Department Statistics */}
              <div className="mt-8">
                <div className="overflow-hidden bg-white rounded-lg shadow">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Department Statistics</h3>
                  </div>
                  <div className="px-6 py-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="p-5 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 p-3 rounded-md bg-indigo-500">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Total Employees</p>
                            <p className="text-2xl font-semibold text-gray-900">245</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 p-3 rounded-md bg-green-500">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Active Projects</p>
                            <p className="text-2xl font-semibold text-gray-900">44</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 p-3 rounded-md bg-blue-500">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Total Budget</p>
                            <p className="text-2xl font-semibold text-gray-900">$2.73M</p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Departments;