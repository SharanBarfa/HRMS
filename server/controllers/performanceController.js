import Performance from '../models/performanceModel.js';
import Employee from '../models/employeeModel.js';

// @desc    Get all performance reviews
// @route   GET /api/performance
// @access  Private
export const getPerformanceReviews = async (req, res) => {
  try {
    // Build query
    let query = {};
    
    // Filter by employee
    if (req.query.employee) {
      query.employee = req.query.employee;
    }
    
    // Filter by reviewer
    if (req.query.reviewer) {
      query.reviewer = req.query.reviewer;
    }
    
    // Filter by status
    if (req.query.status && req.query.status !== 'all') {
      query.status = req.query.status;
    }
    
    // Filter by review period
    if (req.query.period) {
      const [year, quarter] = req.query.period.split('-');
      let startDate, endDate;
      
      if (quarter === 'q1') {
        startDate = new Date(`${year}-01-01`);
        endDate = new Date(`${year}-03-31`);
      } else if (quarter === 'q2') {
        startDate = new Date(`${year}-04-01`);
        endDate = new Date(`${year}-06-30`);
      } else if (quarter === 'q3') {
        startDate = new Date(`${year}-07-01`);
        endDate = new Date(`${year}-09-30`);
      } else if (quarter === 'q4') {
        startDate = new Date(`${year}-10-01`);
        endDate = new Date(`${year}-12-31`);
      }
      
      if (startDate && endDate) {
        query['reviewPeriod.startDate'] = { $gte: startDate };
        query['reviewPeriod.endDate'] = { $lte: endDate };
      }
    }
    
    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.reviewDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const performanceReviews = await Performance.find(query)
      .populate({
        path: 'employee',
        select: 'firstName lastName employeeId department',
        populate: {
          path: 'department',
          select: 'name'
        }
      })
      .populate('reviewer', 'name')
      .sort({ reviewDate: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await Performance.countDocuments(query);
    
    res.json({
      success: true,
      count: performanceReviews.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: performanceReviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get performance review by ID
// @route   GET /api/performance/:id
// @access  Private
export const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
      .populate({
        path: 'employee',
        select: 'firstName lastName employeeId department position',
        populate: {
          path: 'department',
          select: 'name'
        }
      })
      .populate('reviewer', 'name');
    
    if (!performance) {
      return res.status(404).json({
        success: false,
        error: 'Performance review not found'
      });
    }
    
    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create performance review
// @route   POST /api/performance
// @access  Private
export const createPerformance = async (req, res) => {
  try {
    const {
      employee,
      reviewPeriod,
      ratings,
      goals,
      strengths,
      areasForImprovement,
      comments,
      status
    } = req.body;
    
    // Check if employee exists
    const employeeExists = await Employee.findById(employee);
    
    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    // Create performance review
    const performance = await Performance.create({
      employee,
      reviewer: req.user._id,
      reviewPeriod,
      reviewDate: new Date(),
      ratings,
      goals,
      strengths,
      areasForImprovement,
      comments,
      status: status || 'draft'
    });
    
    res.status(201).json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update performance review
// @route   PUT /api/performance/:id
// @access  Private
export const updatePerformance = async (req, res) => {
  try {
    let performance = await Performance.findById(req.params.id);
    
    if (!performance) {
      return res.status(404).json({
        success: false,
        error: 'Performance review not found'
      });
    }
    
    // Check if user is the reviewer or admin
    if (performance.reviewer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this review'
      });
    }
    
    // Update performance review
    performance = await Performance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete performance review
// @route   DELETE /api/performance/:id
// @access  Private/Admin
export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    
    if (!performance) {
      return res.status(404).json({
        success: false,
        error: 'Performance review not found'
      });
    }
    
    // Check if user is the reviewer or admin
    if (performance.reviewer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this review'
      });
    }
    
    await performance.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Acknowledge performance review
// @route   PUT /api/performance/:id/acknowledge
// @access  Private
export const acknowledgePerformance = async (req, res) => {
  try {
    const { comments } = req.body;
    
    const performance = await Performance.findById(req.params.id);
    
    if (!performance) {
      return res.status(404).json({
        success: false,
        error: 'Performance review not found'
      });
    }
    
    // Check if the user is the employee being reviewed
    const employee = await Employee.findById(performance.employee);
    
    if (!employee || employee.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to acknowledge this review'
      });
    }
    
    // Update acknowledgement
    performance.acknowledgement = {
      acknowledged: true,
      date: new Date(),
      comments: comments || ''
    };
    
    performance.status = 'acknowledged';
    
    await performance.save();
    
    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get performance stats
// @route   GET /api/performance/stats
// @access  Private
export const getPerformanceStats = async (req, res) => {
  try {
    // Get date range
    const { period } = req.query;
    let dateQuery = {};
    
    if (period) {
      const [year, quarter] = period.split('-');
      let startDate, endDate;
      
      if (quarter === 'q1') {
        startDate = new Date(`${year}-01-01`);
        endDate = new Date(`${year}-03-31`);
      } else if (quarter === 'q2') {
        startDate = new Date(`${year}-04-01`);
        endDate = new Date(`${year}-06-30`);
      } else if (quarter === 'q3') {
        startDate = new Date(`${year}-07-01`);
        endDate = new Date(`${year}-09-30`);
      } else if (quarter === 'q4') {
        startDate = new Date(`${year}-10-01`);
        endDate = new Date(`${year}-12-31`);
      }
      
      if (startDate && endDate) {
        dateQuery = {
          'reviewPeriod.startDate': { $gte: startDate },
          'reviewPeriod.endDate': { $lte: endDate }
        };
      }
    }
    
    // Get average ratings
    const averageRatings = await Performance.aggregate([
      { $match: dateQuery },
      { $group: {
          _id: null,
          avgProductivity: { $avg: '$ratings.productivity' },
          avgQuality: { $avg: '$ratings.quality' },
          avgJobKnowledge: { $avg: '$ratings.jobKnowledge' },
          avgCommunication: { $avg: '$ratings.communication' },
          avgTeamwork: { $avg: '$ratings.teamwork' },
          avgInitiative: { $avg: '$ratings.initiative' },
          avgOverall: { $avg: '$overallRating' }
        }
      }
    ]);
    
    // Get department performance
    const departmentPerformance = await Performance.aggregate([
      { $match: dateQuery },
      { $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeInfo'
        }
      },
      { $unwind: '$employeeInfo' },
      { $lookup: {
          from: 'departments',
          localField: 'employeeInfo.department',
          foreignField: '_id',
          as: 'departmentInfo'
        }
      },
      { $unwind: '$departmentInfo' },
      { $group: {
          _id: '$departmentInfo._id',
          name: { $first: '$departmentInfo.name' },
          avgRating: { $avg: '$overallRating' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgRating: -1 } }
    ]);
    
    // Get top performers
    const topPerformers = await Performance.aggregate([
      { $match: dateQuery },
      { $sort: { overallRating: -1 } },
      { $limit: 5 },
      { $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeInfo'
        }
      },
      { $unwind: '$employeeInfo' },
      { $project: {
          _id: 1,
          employeeId: '$employeeInfo.employeeId',
          firstName: '$employeeInfo.firstName',
          lastName: '$employeeInfo.lastName',
          position: '$employeeInfo.position',
          overallRating: 1
        }
      }
    ]);
    
    // Get goal completion stats
    const goalStats = await Performance.aggregate([
      { $match: dateQuery },
      { $unwind: '$goals' },
      { $group: {
          _id: '$goals.status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format goal stats
    const formattedGoalStats = {
      pending: 0,
      'in-progress': 0,
      completed: 0,
      cancelled: 0
    };
    
    goalStats.forEach(item => {
      formattedGoalStats[item._id] = item.count;
    });
    
    res.json({
      success: true,
      data: {
        averageRatings: averageRatings.length > 0 ? averageRatings[0] : null,
        departmentPerformance,
        topPerformers,
        goalStats: formattedGoalStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
