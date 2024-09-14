import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Book, Users, DollarSign, TrendingUp, Bell, User, Menu, X, Home, FileText, MessageSquare, Settings, Award } from 'lucide-react';

const courseData = [
  { name: 'Web Development', students: 120, revenue: 6000, rating: 4.7 },
  { name: 'Data Science', students: 80, revenue: 4800, rating: 4.5 },
  { name: 'UX Design', students: 65, revenue: 3250, rating: 4.8 },
  { name: 'Mobile Dev', students: 95, revenue: 5700, rating: 4.6 },
];

const studentActivityData = [
  { date: '2024-09-01', active: 180 },
  { date: '2024-09-02', active: 200 },
  { date: '2024-09-03', active: 210 },
  { date: '2024-09-04', active: 190 },
  { date: '2024-09-05', active: 240 },
  { date: '2024-09-06', active: 230 },
  { date: '2024-09-07', active: 200 },
];

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 4500 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4800 },
  { month: 'May', revenue: 5200 },
  { month: 'Jun', revenue: 5800 },
];

const studentDistributionData = [
  { name: 'Web Development', value: 120 },
  { name: 'Data Science', value: 80 },
  { name: 'UX Design', value: 65 },
  { name: 'Mobile Dev', value: 95 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const InstructorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const SidebarLink = ({ icon: Icon, text }) => (
    <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition duration-150 ease-in-out">
      <Icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{text}</span>
    </a>
  );

  const StatCard = ({ icon: Icon, title, value, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      <div className={`mt-2 flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        <TrendingUp className="h-4 w-4 mr-1" />
        <span>{Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 shadow-lg`}>
        <div className="p-5 flex items-center justify-between border-b border-gray-200">
          <span className="text-2xl font-bold text-indigo-600">EduHub</span>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink icon={Home} text="Dashboard" />
          <SidebarLink icon={Book} text="My Courses" />
          <SidebarLink icon={Users} text="Students" />
          <SidebarLink icon={FileText} text="Assignments" />
          <SidebarLink icon={MessageSquare} text="Discussion" />
          <SidebarLink icon={Award} text="Reviews" />
          {/* <SidebarLink icon={DollarSign} text="Earnings" /> */}
          <SidebarLink icon={Settings} text="Settings" />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600 lg:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Prof. Smith</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Instructor Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard icon={Users} title="Total Students" value="360" change={5.4} />
            <StatCard icon={Book} title="Active Courses" value="4" change={0} />
            <StatCard icon={DollarSign} title="Total Earnings" value="$19,750" change={12.3} />
            <StatCard icon={Award} title="Average Rating" value="4.7" change={2.1} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Student Activity */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Performance and Student Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Course Performance */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Performance</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courseData.map((course, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${course.revenue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Student Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <ul className="divide-y divide-gray-200">
              {[
                { action: 'New student enrolled', course: 'Web Development', time: '2 hours ago' },
                { action: 'Assignment submitted', course: 'Data Science', time: '1 day ago' },
                { action: 'Discussion forum post', course: 'UX Design', time: '3 days ago' },
                { action: 'Course rating received', course: 'Mobile Dev', time: '1 week ago' },
              ].map((item, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-500">{item.course} - {item.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;