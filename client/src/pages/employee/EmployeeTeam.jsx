import React from 'react';
import { useAuth } from '../../context/AuthContext';

const EmployeeTeam = () => {
  const { user } = useAuth();
  
  // Sample team data (would come from API in real app)
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Team Lead',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Software Developer',
      email: 'sarah.johnson@example.com',
      phone: '(555) 234-5678',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 3,
      name: 'Michael Brown',
      position: 'Software Developer',
      email: 'michael.brown@example.com',
      phone: '(555) 345-6789',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'UX Designer',
      email: 'emily.davis@example.com',
      phone: '(555) 456-7890',
      department: 'Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 5,
      name: 'David Wilson',
      position: 'QA Engineer',
      email: 'david.wilson@example.com',
      phone: '(555) 567-8901',
      department: 'Quality Assurance',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];
  
  const teamProjects = [
    {
      id: 1,
      name: 'Website Redesign',
      status: 'In Progress',
      progress: 65,
      dueDate: '2025-05-15',
      members: [1, 2, 4]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'In Progress',
      progress: 40,
      dueDate: '2025-06-30',
      members: [1, 2, 3, 5]
    },
    {
      id: 3,
      name: 'API Integration',
      status: 'Planning',
      progress: 10,
      dueDate: '2025-07-15',
      members: [1, 3, 5]
    }
  ];
  
  const upcomingMeetings = [
    {
      id: 1,
      title: 'Daily Standup',
      date: 'Today',
      time: '9:00 AM - 9:15 AM',
      location: 'Zoom Meeting'
    },
    {
      id: 2,
      title: 'Sprint Planning',
      date: 'Tomorrow',
      time: '10:00 AM - 12:00 PM',
      location: 'Conference Room A'
    },
    {
      id: 3,
      title: 'Code Review',
      date: 'Apr 15, 2025',
      time: '2:00 PM - 3:00 PM',
      location: 'Zoom Meeting'
    }
  ];
  
  return (
    <div className="py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Team</h1>
        <p className="mt-1 text-sm text-gray-600">
          View your team members, projects, and upcoming meetings
        </p>
      </div>
      
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        {/* Team members */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Team Members</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your current team</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <li key={member.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={member.image} alt={member.name} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.position}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Message
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span>{member.email}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Team projects */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Team Projects</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Current projects your team is working on</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {teamProjects.map((project) => (
                <li key={project.id} className="px-4 py-4 sm:px-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Due: {project.dueDate}</span>
                        <span>{project.progress}% complete</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex -space-x-2 overflow-hidden">
                      {project.members.map((memberId) => {
                        const member = teamMembers.find(m => m.id === memberId);
                        return (
                          <img
                            key={memberId}
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                            src={member.image}
                            alt={member.name}
                            title={member.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Upcoming meetings */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Meetings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Scheduled team meetings</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {upcomingMeetings.map((meeting) => (
                <li key={meeting.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{meeting.title}</h4>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{meeting.date}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{meeting.time}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Join Meeting
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTeam;
