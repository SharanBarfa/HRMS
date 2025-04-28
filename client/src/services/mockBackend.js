// Mock backend service for development
// We'll use a simpler approach without MSW for now

// Simple base64 encoding for token (not secure, just for demo)
const encodeToken = (payload) => {
  return btoa(JSON.stringify(payload));
};

// Simple token verification (not secure, just for demo)
const verifyToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (e) {
    throw new Error('Invalid token');
  }
};

// Mock user data
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    department: 'Management',
    position: 'System Administrator',
    joinDate: '2023-01-15',
    phone: '(555) 123-4567'
  },
  {
    id: 2,
    name: 'John Employee',
    email: 'employee@example.com',
    password: 'employee123',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    joinDate: '2023-03-20',
    phone: '(555) 987-6543'
  }
];

// Generate token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
  };

  return encodeToken(payload);
};

// Mock API functions
const mockAPI = {
  // Login endpoint
  login: async (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        ...userWithoutPassword,
        token
      }
    };
  },

  // Register endpoint
  register: async (userData) => {
    const { email, password, name, role = 'employee' } = userData;

    if (users.some(u => u.email === email)) {
      throw new Error('Email already in use');
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role,
      department: 'Unassigned',
      position: 'New Employee',
      joinDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);

    const token = generateToken(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      data: {
        ...userWithoutPassword,
        token
      }
    };
  },

  // Get user profile
  getProfile: async (token) => {
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const decoded = verifyToken(token);
      const user = users.find(u => u.id === decoded.id);

      if (!user) {
        throw new Error('User not found');
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        data: userWithoutPassword
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  // Update user profile
  updateProfile: async (token, userData) => {
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const decoded = verifyToken(token);
      const userIndex = users.findIndex(u => u.id === decoded.id);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user data (except password and role)
      const { password, role, ...updateData } = userData;
      users[userIndex] = {
        ...users[userIndex],
        ...updateData
      };

      const { password: _, ...userWithoutPassword } = users[userIndex];

      return {
        success: true,
        data: userWithoutPassword
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};

export default mockAPI;
