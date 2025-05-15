const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Admin and manager routes
router.use(authorize('admin', 'manager'));

// Project routes
router.route('/')
  .get(projectController.getProjects)
  .post(projectController.createProject);

router.route('/:id')
  .get(projectController.getProjectById)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

router.route('/:id/progress')
  .put(projectController.updateProjectProgress);

router.route('/department/:departmentId')
  .get(projectController.getProjectsByDepartment);

router.route('/manager/:managerId')
  .get(projectController.getProjectsByManager);

module.exports = router; 