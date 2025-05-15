const Project = require('../models/Project');

// Get all projects with populated fields
exports.getProjects = async () => {
  try {
    const projects = await Project.find()
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Create a new project
exports.createProject = async (projectData) => {
  try {
    const project = await Project.create(projectData);
    const populatedProject = await Project.findById(project._id)
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');
    return { success: true, data: populatedProject };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update a project
exports.updateProject = async (projectId, updateData) => {
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');

    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete a project
exports.deleteProject = async (projectId) => {
  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get project by ID
exports.getProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId)
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');

    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update project progress
exports.updateProjectProgress = async (projectId, progress) => {
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $set: { progress } },
      { new: true, runValidators: true }
    )
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');

    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get projects by department
exports.getProjectsByDepartment = async (departmentId) => {
  try {
    const projects = await Project.find({ department: departmentId })
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get projects by manager
exports.getProjectsByManager = async (managerId) => {
  try {
    const projects = await Project.find({ manager: managerId })
      .populate('manager', 'firstName lastName email position')
      .populate('team', 'name')
      .populate('department', 'name');
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: error.message };
  }
}; 