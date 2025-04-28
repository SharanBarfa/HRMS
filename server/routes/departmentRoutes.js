import express from 'express';
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentStats
} from '../controllers/departmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.route('/')
  .get(protect, getDepartments)
  .post(protect, admin, createDepartment);

router.route('/stats')
  .get(protect, getDepartmentStats);

router.route('/:id')
  .get(protect, getDepartmentById)
  .put(protect, admin, updateDepartment)
  .delete(protect, admin, deleteDepartment);

export default router;
