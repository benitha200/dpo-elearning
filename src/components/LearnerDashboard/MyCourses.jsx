import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: 'Web Development', description: 'Learn the fundamentals of web development.' },
    { id: 2, title: 'Data Science', description: 'Explore data analysis and machine learning.' },
    { id: 3, title: 'UX Design', description: 'Master the principles of user experience design.' },
    { id: 4, title: 'Mobile Development', description: 'Build mobile apps for iOS and Android.' },
  ];

  const handleContinueLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <button
                onClick={() => handleContinueLearning(course.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;