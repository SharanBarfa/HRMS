import React from 'react';
import Card from '../common/Card';

const RecentActivities = ({ activities }) => {
  // Sample data if none provided
  const activityData = activities || [
    { id: 1, type: 'new_employee', user: 'Admin', subject: 'Sarah Parker', timestamp: '2025-04-05T14:30:00Z', description: 'added a new employee' },
    { id: 2, type: 'project_update', user: 'John Doe', subject: 'Website Redesign', timestamp: '2025-04-05T13:15:00Z', description: 'updated project status to "In Progress"' },
    { id: 3, type: 'resource_allocation', user: 'Jane Smith', subject: 'Mobile App', timestamp: '2025-04-04T16:45:00Z', description: 'allocated 3 new resources' },
    { id: 4, type: 'employee_leave', user: 'Mike Johnson', subject: 'Annual Leave', timestamp: '2025-04-04T11:20:00Z', description: 'requested leave from April 15 to April 22' },
    { id: 5, type: 'project_created', user: 'Admin', subject: 'CRM Implementation', timestamp: '2025-04-03T09:45:00Z', description: 'created a new project' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'new_employee':
        return (
          <div className="bg-green-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'project_update':
        return (
          <div className="bg-blue-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case 'resource_allocation':
        return (
          <div className="bg-purple-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        );
      case 'employee_leave':
        return (
          <div className="bg-yellow-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'project_created':
        return (
          <div className="bg-indigo-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <Card title="Recent Activities" className="h-full">
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {activityData.map((activity) => (
            <li key={activity.id} className="py-3">
              <div className="flex items-start space-x-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    <span className="font-semibold">{activity.user}</span> {activity.description}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.subject}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default RecentActivities;