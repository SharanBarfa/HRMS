import Department from '../models/departmentModel.js';
import Employee from '../models/employeeModel.js';

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
export const getDepartments = async (req, res) => {
  try {
    // Build query
    let query = {};
    
    // Search by name
    if (req.query.search) {
      query.name = new RegExp(req.query.search, 'i');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const departments = await Department.find(query)
      .populate('manager', 'firstName lastName')
      .sort({ name: 1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await Department.countDocuments(query);
    
    // Get employee count for each department
    const departmentsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const employeeCount = await Employee.countDocuments({ department: dept._id });
        return {
          ...dept.toObject(),
          employeeCount
        };
      })
    );
    
    res.json({
      success: true,
      count: departments.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: departmentsWithCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Private
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('manager', 'firstName lastName');
    
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found'
      });
    }
    
    // Get employees in this department
    const employees = await Employee.find({ department: department._id })
      .select('firstName lastName position status');
    
    res.json({
      success: true,
      data: {
        ...department.toObject(),
        employees,
        employeeCount: employees.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private/Admin
export const createDepartment = async (req, res) => {
  try {
    const { name, description, manager, budget, location } = req.body;
    
    // Check if department already exists
    const departmentExists = await Department.findOne({ name });
    
    if (departmentExists) {
      return res.status(400).json({
        success: false,
        error: 'Department already exists'
      });
    }
    
    // Create department
    const department = await Department.create({
      name,
      description,
      manager,
      budget,
      location
    });
    
    res.status(201).json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private/Admin
export const updateDepartment = async (req, res) => {
  try {
    let department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found'
      });
    }
    
    // Update department
    department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found'
      });
    }
    
    // Check if there are employees in this department
    const employeeCount = await Employee.countDocuments({ department: department._id });
    
    if (employeeCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete department with ${employeeCount} employees. Reassign employees first.`
      });
    }
    
    await department.deleteOne();
    
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

// @desc    Get department stats
// @route   GET /api/departments/stats
// @access  Private
export const getDepartmentStats = async (req, res) => {
  try {
    // Get total departments
    const totalDepartments = await Department.countDocuments();
    
    // Get department with most employees
    const departments = await Department.find();
    
    const departmentsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const employeeCount = await Employee.countDocuments({ department: dept._id });
        return {
          _id: dept._id,
          name: dept.name,
          employeeCount
        };
      })
    );
    
    // Sort by employee count
    departmentsWithCounts.sort((a, b) => b.employeeCount - a.employeeCount);
    
    // Get total budget
    const totalBudget = departments.reduce((sum, dept) => sum + (dept.budget || 0), 0);
    
    res.json({
      success: true,
      data: {
        totalDepartments,
        departmentsWithCounts,
        largestDepartment: departmentsWithCounts[0] || null,
        totalBudget
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
