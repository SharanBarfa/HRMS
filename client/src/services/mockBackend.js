import axios from "axios";

// Mock API functions
const mockAPI = {
  // Login endpoint
  login: async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await axios.post(`/api/users/login`, { email, password });

    return {
      success: true,
      data: {
        user: user.data.data,
        token: user.data.data.token,
      },
    };
  },

  // Register endpoint
  register: async (userData) => {
    const { email, password, name, role = "employee" } = userData;
    if (!email || !password || !name) {
      throw new Error("Email, password, and name are required");
    }

    const user = await axios.post("/api/users/", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      data: {
        user: user.data.data,
        token: user.data.data.token,
      },
    };
  },

  // Get user profile
  getProfile: async (token) => {
   
    try {
      const res = await axios.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      throw new Error("Invalid token");
    }
  },

  // Update user profile
  updateProfile: async (token, userData) => {
    if (!token) {
      throw new Error("Unauthorized");
    }

    try {
      const decoded = verifyToken(token);
      const userIndex = users.findIndex((u) => u.id === decoded.id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      // Update user data (except password and role)
      const { password, role, ...updateData } = userData;
      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
      };

      const { password: _, ...userWithoutPassword } = users[userIndex];

      return {
        success: true,
        data: userWithoutPassword,
      };
    } catch (error) {
      throw new Error("Invalid token");
    }
  },
};

export default mockAPI;
