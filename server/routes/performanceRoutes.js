import express from 'express';
import {
  getPerformanceReviews,
  getPerformanceById,
  createPerformance,
  updatePerformance,
  deletePerformance,
  acknowledgePerformance,
  getPerformanceStats
} from '../controllers/performanceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.route('/')
  .get(protect, getPerformanceReviews)
  .post(protect, createPerformance);

router.route('/stats')
  .get(protect, getPerformanceStats);

router.route('/:id')
  .get(protect, getPerformanceById)
  .put(protect, updatePerformance)
  .delete(protect, deletePerformance);

router.route('/:id/acknowledge')
  .put(protect, acknowledgePerformance);

export default router;
