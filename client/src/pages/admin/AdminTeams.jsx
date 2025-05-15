import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTeams, createTeam, updateTeam, deleteTeam, addTeamMember, removeTeamMember } from '../../services/teamService';
import { getEmployees } from '../../services/employeeService';
import { getProjects } from '../../services/projectService';

const AdminTeams = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: [],
    leader: '',
    project: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(employee => 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setEmployeesLoading(true);
      setEmployeesError(null);

      // Fetch teams
      const teamsResponse = await getTeams();
      if (teamsResponse.success) {
        setTeams(teamsResponse.data || []);
      }

      // Fetch employees
      const employeesResponse = await getEmployees();
      if (employeesResponse.success) {
        setEmployees(employeesResponse.data || []);
        setFilteredEmployees(employeesResponse.data || []);
      } else {
        setEmployeesError('Failed to load employees');
      }

      // Fetch projects
      const projectsResponse = await getProjects();
      if (projectsResponse.success) {
        setProjects(projectsResponse.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
      setEmployeesError('Failed to load employees');
    } finally {
      setLoading(false);
      setEmployeesLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      members: selectedOptions
    }));
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      
      if (!formData.name || !formData.leader) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await createTeam(formData);
      if (response.success) {
        const updatedTeams = await getTeams();
        if (updatedTeams.success) {
          setTeams(updatedTeams.data || []);
        }
        
        setShowCreateModal(false);
        setFormData({
          name: '',
          description: '',
          members: [],
          leader: '',
          project: ''
        });
      } else {
        setError(response.error || 'Failed to create team');
      }
    } catch (err) {
      console.error('Error creating team:', err);
      setError(err.response?.data?.message || 'Failed to create team');
    }
  };

  const handleEditTeam = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      
      if (!formData.name || !formData.leader) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await updateTeam(selectedTeam._id, formData);
      if (response.success) {
        const updatedTeams = await getTeams();
        if (updatedTeams.success) {
          setTeams(updatedTeams.data || []);
        }
        
        setShowEditModal(false);
        setSelectedTeam(null);
        setFormData({
          name: '',
          description: '',
          members: [],
          leader: '',
          project: ''
        });
      } else {
        setError(response.error || 'Failed to update team');
      }
    } catch (err) {
      console.error('Error updating team:', err);
      setError(err.response?.data?.message || 'Failed to update team');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        const response = await deleteTeam(teamId);
        if (response.success) {
          const updatedTeams = await getTeams();
          if (updatedTeams.success) {
            setTeams(updatedTeams.data || []);
          }
        } else {
          setError(response.error || 'Failed to delete team');
        }
      } catch (err) {
        console.error('Error deleting team:', err);
        setError(err.response?.data?.message || 'Failed to delete team');
      }
    }
  };

  const openEditModal = (team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      description: team.description || '',
      members: team.members.map(member => member._id),
      leader: team.leader._id,
      project: team.project?._id || ''
    });
    setShowEditModal(true);
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Team
          </button>
        </div>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Teams List */}
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div key={team._id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{team.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Team Leader:</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {team.leader.firstName} {team.leader.lastName}
                  </p>
                </div>

                {team.project && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Assigned Project:</h4>
                    <p className="mt-1 text-sm text-gray-600">{team.project.name}</p>
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Team Members:</h4>
                  <ul className="mt-2 space-y-2">
                    {team.members.map((member) => (
                      <li key={member._id} className="text-sm text-gray-600">
                        {member.firstName} {member.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <button
                    onClick={() => openEditModal(team)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team._id)}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Team</h2>
            <form onSubmit={handleCreateTeam}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Leader</label>
                  <select
                    name="leader"
                    value={formData.leader}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a team leader</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Members</label>
                  <select
                    name="members"
                    multiple
                    value={formData.members}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData(prev => ({
                        ...prev,
                        members: selectedOptions
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    size="5"
                  >
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName} - {employee.department?.name || 'No Department'}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Hold Ctrl (Windows) or Command (Mac) to select multiple members
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a project (optional)</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name} - {project.status} ({project.progress}%)
                      </option>
                    ))}
                  </select>
                  {formData.project && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Project Status:</span>{' '}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          projects.find(p => p._id === formData.project)?.status === 'completed' ? 'bg-green-100 text-green-800' :
                          projects.find(p => p._id === formData.project)?.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          projects.find(p => p._id === formData.project)?.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {projects.find(p => p._id === formData.project)?.status.replace('_', ' ')}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Progress:</span>{' '}
                        {projects.find(p => p._id === formData.project)?.progress}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${projects.find(p => p._id === formData.project)?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Edit Team</h2>
            <form onSubmit={handleEditTeam}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Leader</label>
                  <select
                    name="leader"
                    value={formData.leader}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a team leader</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Members</label>
                  <select
                    name="members"
                    multiple
                    value={formData.members}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData(prev => ({
                        ...prev,
                        members: selectedOptions
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    size="5"
                  >
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName} - {employee.department?.name || 'No Department'}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Hold Ctrl (Windows) or Command (Mac) to select multiple members
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a project (optional)</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name} - {project.status} ({project.progress}%)
                      </option>
                    ))}
                  </select>
                  {formData.project && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Project Status:</span>{' '}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          projects.find(p => p._id === formData.project)?.status === 'completed' ? 'bg-green-100 text-green-800' :
                          projects.find(p => p._id === formData.project)?.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          projects.find(p => p._id === formData.project)?.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {projects.find(p => p._id === formData.project)?.status.replace('_', ' ')}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Progress:</span>{' '}
                        {projects.find(p => p._id === formData.project)?.progress}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${projects.find(p => p._id === formData.project)?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedTeam(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Update Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeams; 