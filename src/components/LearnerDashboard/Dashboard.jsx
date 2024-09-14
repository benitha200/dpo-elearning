import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, BookOpen, Award,User,Book } from 'lucide-react';

const progressData = [
  { name: 'Web Dev', completed: 75, total: 100 },
  { name: 'Data Science', completed: 45, total: 100 },
  { name: 'UX Design', completed: 60, total: 100 },
  { name: 'Mobile Dev', completed: 30, total: 100 },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome back, John!</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Course Progress */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <ul className="divide-y divide-gray-200">
              {[
                { course: 'Web Development', task: 'Project Submission', date: '2024-09-20' },
                { course: 'Data Science', task: 'Quiz', date: '2024-09-22' },
                { course: 'UX Design', task: 'Peer Review', date: '2024-09-25' },
              ].map((item, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                    <p className="text-sm font-medium text-gray-900">{item.course}: {item.task}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <ul className="divide-y divide-gray-200">
              {[
                { action: 'Completed lesson', course: 'Web Development', time: '2 hours ago' },
                { action: 'Submitted assignment', course: 'Data Science', time: '1 day ago' },
                { action: 'Started new course', course: 'Mobile Development', time: '3 days ago' },
              ].map((item, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.course} - {item.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { name: 'My Courses', icon: BookOpen },
            { name: 'Certificates', icon: Award },
            { name: 'Discussion Forums', icon: User },
            { name: 'Resources', icon: Book },
          ].map((item, index) => (
            <div key={index} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out">
              <div className="p-5 flex flex-col items-center">
                <item.icon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;