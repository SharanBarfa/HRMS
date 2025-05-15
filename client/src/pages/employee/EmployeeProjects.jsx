import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProjects, sendProjectMessage } from '../../services/projectService';
import { getCurrentEmployee } from '../../services/employeeService';
import { getTeamMembers } from '../../services/teamService';

const EmployeeProjects = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current employee data
      const employeeResponse = await getCurrentEmployee();
      if (employeeResponse.success) {
        setEmployee(employeeResponse.data);
      }

      // Get projects
      const projectsResponse = await getProjects();
      if (projectsResponse.success) {
        // Filter projects where the current employee is assigned
        const employeeProjects = projectsResponse.data.filter(project => 
          project.tasks.some(task => task.assignedTo === employeeResponse.data._id)
        );
        setProjects(employeeProjects);
      }

      // Get team members
      const teamResponse = await getTeamMembers();
      if (teamResponse.success) {
        setTeamMembers(teamResponse.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedProject) return;

    try {
      const response = await sendProjectMessage(selectedProject._id, {
        content: newMessage,
        sender: user._id,
        projectId: selectedProject._id,
        recipient: selectedProject.team._id // Send to team
      });

      if (response.success) {
        setMessages([...messages, response.data]);
        setNewMessage('');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Projects</h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage your assigned projects and tasks
        </p>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Projects List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Assigned Projects</h3>
            </div>
            <div className="border-t border-gray-200">
              {projects.length === 0 ? (
                <div className="px-4 py-5 text-center text-gray-500">
                  No projects assigned yet
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <li key={project._id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-500">{project.description}</p>
                          <div className="mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800' :
                              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          View Details
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Project Details and Chat */}
          {selectedProject && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Project Details: {selectedProject.name}
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Description</h4>
                      <p className="mt-1 text-sm text-gray-500">{selectedProject.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Timeline</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Start: {new Date(selectedProject.startDate).toLocaleDateString()}
                        <br />
                        End: {new Date(selectedProject.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">My Tasks</h4>
                      <ul className="mt-2 space-y-2">
                        {selectedProject.tasks
                          .filter(task => task.assignedTo === employee?._id)
                          .map((task, index) => (
                            <li key={index} className="text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-900">{task.title}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {task.status}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Team Members</h4>
                      <ul className="mt-2 space-y-2">
                        {teamMembers.map((member) => (
                          <li key={member._id} className="flex items-center space-x-3">
                            <img
                              src={member.profileImage || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}`}
                              alt={`${member.firstName} ${member.lastName}`}
                              className="h-8 w-8 rounded-full"
                            />
                            <span className="text-sm text-gray-900">
                              {member.firstName} {member.lastName}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Team Chat</h4>
                      <div className="mt-2 space-y-4">
                        <div className="h-64 overflow-y-auto border rounded-md p-4">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`mb-4 ${
                                message.sender === user._id ? 'text-right' : 'text-left'
                              }`}
                            >
                              <div
                                className={`inline-block rounded-lg px-4 py-2 ${
                                  message.sender === user._id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs mt-1 opacity-75">
                                  {new Date(message.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="flex space-x-4">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProjects; 