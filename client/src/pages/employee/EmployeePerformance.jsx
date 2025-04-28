import React from 'react';
import { useAuth } from '../../context/AuthContext';

const EmployeePerformance = () => {
  const { user } = useAuth();
  
  // Sample performance data (would come from API in real app)
  const performanceReviews = [
    {
      id: 1,
      period: 'Q1 2025',
      reviewDate: '2025-04-05',
      reviewer: 'John Smith',
      status: 'Completed',
      overallRating: 4.2,
      ratings: {
        productivity: 4.5,
        quality: 4.0,
        jobKnowledge: 4.5,
        communication: 4.0,
        teamwork: 4.5,
        initiative: 3.5
      },
      strengths: [
        'Excellent problem-solving skills',
        'Strong technical knowledge',
        'Great team player'
      ],
      areasForImprovement: [
        'Could take more initiative on new projects',
        'Documentation could be more thorough'
      ],
      comments: 'Sarah has been a valuable team member this quarter. Her technical skills and problem-solving abilities have been instrumental in the success of several key projects.'
    },
    {
      id: 2,
      period: 'Q4 2024',
      reviewDate: '2024-12-15',
      reviewer: 'John Smith',
      status: 'Completed',
      overallRating: 4.0,
      ratings: {
        productivity: 4.0,
        quality: 4.0,
        jobKnowledge: 4.0,
        communication: 4.0,
        teamwork: 4.5,
        initiative: 3.5
      },
      strengths: [
        'Consistent delivery of high-quality work',
        'Excellent collaboration with team members',
        'Strong technical skills'
      ],
      areasForImprovement: [
        'Could improve on taking initiative',
        'More proactive communication would be beneficial'
      ],
      comments: 'Sarah continues to be a reliable and skilled team member. She consistently delivers quality work and collaborates well with others.'
    }
  ];
  
  const goals = [
    {
      id: 1,
      description: 'Complete advanced React certification',
      targetDate: '2025-06-30',
      progress: 75,
      status: 'In Progress'
    },
    {
      id: 2,
      description: 'Mentor a junior developer',
      targetDate: '2025-12-31',
      progress: 50,
      status: 'In Progress'
    },
    {
      id: 3,
      description: 'Improve documentation practices',
      targetDate: '2025-05-15',
      progress: 25,
      status: 'In Progress'
    }
  ];
  
  // Helper function to render rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star-gradient" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div className="py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Performance</h1>
        <p className="mt-1 text-sm text-gray-600">
          View your performance reviews and goals
        </p>
      </div>
      
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        {/* Performance summary */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Summary</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest performance metrics</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-base font-medium text-gray-900">Overall Rating</h4>
                <div className="mt-2">
                  {renderRatingStars(performanceReviews[0].overallRating)}
                </div>
                <p className="mt-1 text-sm text-gray-500">Based on your most recent review</p>
              </div>
              
              <div>
                <h4 className="text-base font-medium text-gray-900">Key Strengths</h4>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                  {performanceReviews[0].strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Goals */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Current Goals</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your active performance goals</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {goals.map((goal) => (
                <li key={goal.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{goal.description}</p>
                      <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-500">Target: {goal.targetDate}</p>
                        <span className={`ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          goal.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          goal.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 w-32">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 text-right">{goal.progress}% complete</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Performance reviews */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Reviews</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your performance review history</p>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-8">
                  {performanceReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{review.period} Review</h4>
                          <p className="mt-1 text-sm text-gray-500">Reviewed on {review.reviewDate} by {review.reviewer}</p>
                        </div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          review.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          review.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Ratings</h5>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Productivity</span>
                              {renderRatingStars(review.ratings.productivity)}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Quality</span>
                              {renderRatingStars(review.ratings.quality)}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Job Knowledge</span>
                              {renderRatingStars(review.ratings.jobKnowledge)}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Communication</span>
                              {renderRatingStars(review.ratings.communication)}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Teamwork</span>
                              {renderRatingStars(review.ratings.teamwork)}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Initiative</span>
                              {renderRatingStars(review.ratings.initiative)}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Feedback</h5>
                          <div className="mt-2">
                            <h6 className="text-xs font-medium text-gray-700">Strengths</h6>
                            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5 space-y-1">
                              {review.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                              ))}
                            </ul>
                            
                            <h6 className="mt-3 text-xs font-medium text-gray-700">Areas for Improvement</h6>
                            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5 space-y-1">
                              {review.areasForImprovement.map((area, index) => (
                                <li key={index}>{area}</li>
                              ))}
                            </ul>
                            
                            <h6 className="mt-3 text-xs font-medium text-gray-700">Comments</h6>
                            <p className="mt-1 text-sm text-gray-600">{review.comments}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformance;
