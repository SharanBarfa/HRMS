import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  
  // Sample attendance data (would come from API in real app)
  const attendanceHistory = [
    { date: '2025-04-10', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', workHours: 8.5 },
    { date: '2025-04-09', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'Present', workHours: 8.5 },
    { date: '2025-04-08', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'Present', workHours: 8.5 },
    { date: '2025-04-07', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', workHours: 8.5 },
    { date: '2025-04-06', checkIn: '-', checkOut: '-', status: 'Weekend', workHours: 0 },
    { date: '2025-04-05', checkIn: '-', checkOut: '-', status: 'Weekend', workHours: 0 },
    { date: '2025-04-04', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'Present', workHours: 8.5 },
  ];
  
  const attendanceSummary = {
    present: 22,
    absent: 0,
    late: 1,
    leave: 2,
    totalWorkDays: 25,
    totalWorkHours: 187
  };
  
  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
    // In a real app, you would call an API to record the check-in
  };
  
  const handleCheckOut = () => {
    setIsCheckedIn(false);
    // In a real app, you would call an API to record the check-out
  };
  
  return (
    <div className="py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Attendance</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track your attendance and view history
        </p>
      </div>
      
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        {/* Check-in/Check-out card */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Today's Attendance</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                {isCheckedIn ? (
                  <div>
                    <p className="text-sm text-gray-500">Checked in at</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {checkInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">You haven't checked in yet today.</p>
                )}
              </div>
              <div>
                {isCheckedIn ? (
                  <button
                    type="button"
                    onClick={handleCheckOut}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Check Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCheckIn}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Check In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance summary */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Present Days</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{attendanceSummary.present}</dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Absent Days</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{attendanceSummary.absent}</dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Late Days</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{attendanceSummary.late}</dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Work Hours</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{attendanceSummary.totalWorkHours}</dd>
            </div>
          </div>
        </div>
        
        {/* Attendance history */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance History</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent attendance records</p>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Work Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'Present' ? 'bg-green-100 text-green-800' :
                          record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                          record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.workHours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
