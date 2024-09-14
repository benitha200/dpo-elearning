import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseContent = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [progress, setProgress] = useState(30);

  // Mock course data
  const course = {
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
    modules: [
      { id: 1, title: "Introduction to HTML", completed: true },
      { id: 2, title: "CSS Styling", completed: true },
      { id: 3, title: "JavaScript Basics", completed: false },
      { id: 4, title: "Responsive Design", completed: false },
    ],
  };

  const handleStartLesson = (moduleId) => {
    navigate(`/course/${courseId}/lesson/${moduleId}`);
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Courses
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-8">{course.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
                <div className="w-full bg-blue-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-600">{progress}% Complete</p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Modules</h2>
                <ul className="space-y-4">
                  {course.modules.map((module, index) => (
                    <li key={module.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {module.completed ? (
                          <CheckCircle size={20} />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <span className={`flex-grow ${module.completed ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                        {module.title}
                      </span>
                      {!module.completed && (
                        <button 
                          onClick={() => handleStartLesson(module.id)}
                          className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                          Start
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="text-blue-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900">Course Content</h3>
              <p className="text-sm text-gray-600">{course.modules.length} modules</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="text-blue-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900">Estimated Time</h3>
              <p className="text-sm text-gray-600">4 weeks</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="text-blue-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900">Certificate</h3>
              <p className="text-sm text-gray-600">Upon completion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;