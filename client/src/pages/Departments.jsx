import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Departments = () => {
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



  return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="block w-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search departments..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Department
            </button>
          </div>
        </div>

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
    
  );
};

export default Departments;
