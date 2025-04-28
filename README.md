# Employee Resource Management System (ERMS)

A comprehensive web application for managing employee resources, attendance, performance, and more.

## Features

- **Role-Based Access Control**: Separate interfaces for administrators and employees
- **Employee Management**: Manage employee profiles, departments, and teams
- **Attendance Tracking**: Track employee attendance and leave management
- **Performance Management**: Monitor and evaluate employee performance
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, React Router, TailwindCSS
- **State Management**: React Context API
- **Authentication**: JWT-based authentication
- **Mock Backend**: MSW (Mock Service Worker) for development

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/erms.git
   cd erms
   ```

2. Install dependencies:
   ```
   cd client
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Accounts

The application includes two demo accounts for testing:

- **Admin Account**:
  - Email: admin@example.com
  - Password: admin123

- **Employee Account**:
  - Email: employee@example.com
  - Password: employee123

## Project Structure

```
client/
├── public/            # Static files
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable components
│   │   ├── common/    # Common components
│   │   ├── layout/    # Layout components
│   │   └── navigation/# Navigation components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   │   ├── admin/     # Admin-specific pages
│   │   └── employee/  # Employee-specific pages
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
└── package.json       # Dependencies and scripts
```

## Authentication Flow

1. User logs in with email and password
2. Backend validates credentials and returns a JWT token
3. Token is stored in localStorage
4. Token is included in the Authorization header for API requests
5. User is redirected to the appropriate dashboard based on their role

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Mock Service Worker](https://mswjs.io/)
