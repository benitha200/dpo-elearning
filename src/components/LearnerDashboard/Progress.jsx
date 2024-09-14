import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const progressData = [
  { name: 'Web Dev', completed: 75, total: 100 },
  { name: 'Data Science', completed: 45, total: 100 },
  { name: 'UX Design', completed: 60, total: 100 },
  { name: 'Mobile Dev', completed: 30, total: 100 },
];

const Progress = () => (
  <div className="w-full min-h-screen bg-gray-100 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Completion Progress</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Completed" fill="#4F46E5" />
              <Bar dataKey="total" name="Total" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h2>
            <div className="text-4xl font-bold text-blue-600">52.5%</div>
            <p className="text-sm text-gray-600 mt-2">Average completion across all courses</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Course</h2>
            <div className="text-2xl font-semibold text-green-600">Web Development</div>
            <p className="text-sm text-gray-600 mt-2">75% completed</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Goal</h2>
            <div className="text-lg font-medium text-purple-600">Complete Data Science Module 3</div>
            <p className="text-sm text-gray-600 mt-2">Estimated time: 2 hours</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Progress;