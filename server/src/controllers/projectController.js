const projectService = require('../services/projectService');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const result = await projectService.getProjects();
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const result = await projectService.createProject(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const result = await projectService.updateProject(req.params.id, req.body);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(req.params.id);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const result = await projectService.getProjectById(req.params.id);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update project progress
exports.updateProjectProgress = async (req, res) => {
  try {
    const result = await projectService.updateProjectProgress(req.params.id, req.body.progress);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get projects by department
exports.getProjectsByDepartment = async (req, res) => {
  try {
    const result = await projectService.getProjectsByDepartment(req.params.departmentId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get projects by manager
exports.getProjectsByManager = async (req, res) => {
  try {
    const result = await projectService.getProjectsByManager(req.params.managerId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 