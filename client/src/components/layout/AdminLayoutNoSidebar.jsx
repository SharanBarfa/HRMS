import React from 'react';
// import TopBar from '../common/TopBar';

const AdminLayoutNoSidebar = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* <TopBar /> */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayoutNoSidebar;
