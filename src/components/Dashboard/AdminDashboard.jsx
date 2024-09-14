import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, BookOpen, TrendingUp, Bell, User, Menu, X, Home, FileText, Settings, Shield, Database, HelpCircle } from 'lucide-react';

// Sample data (in a real application, this would come from an API)
const overviewData = [
  { name: 'Total Users', value: 15000, icon: Users, change: 12.5 },
  { name: 'Total Courses', value: 250, icon: BookOpen, change: 5.2 },
  { name: 'Total Revenue', value: '$500,000', icon: DollarSign, change: 8.7 },
  { name: 'Active Users', value: 8500, icon: Users, change: 3.1 },
];

const UserGrowthData = [
  { month: 'Jan', students: 5000, instructors: 200 },
  { month: 'Feb', students: 5500, instructors: 220 },
  { month: 'Mar', students: 6200, instructors: 245 },
  { month: 'Apr', students: 6800, instructors: 260 },
  { month: 'May', students: 7500, instructors: 285 },
  { month: 'Jun', students: 8200, instructors: 310 },
];

const revenueData = [
  { month: 'Jan', revenue: 70000 },
  { month: 'Feb', revenue: 82000 },
  { month: 'Mar', revenue: 91000 },
  { month: 'Apr', revenue: 85000 },
  { month: 'May', revenue: 94000 },
  { month: 'Jun', revenue: 103000 },
];

const courseDistributionData = [
  { name: 'Technology', value: 100 },
  { name: 'Business', value: 80 },
  { name: 'Design', value: 50 },
  { name: 'Language', value: 30 },
  { name: 'Others', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboard = () => {
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
    <div className="min-h-screen bg-gray-100 flex w-full">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 shadow-lg`}>
        <div className="p-5 flex items-center justify-between border-b border-gray-200">
          <span className="text-2xl font-bold text-indigo-600">DPO E-learning Admin</span>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink icon={Home} text="Dashboard" />
          <SidebarLink icon={Users} text="Users" />
          <SidebarLink icon={BookOpen} text="Courses" />
          <SidebarLink icon={DollarSign} text="Finance" />
          <SidebarLink icon={FileText} text="Reports" />
          <SidebarLink icon={Database} text="Data Management" />
          <SidebarLink icon={Shield} text="Security" />
          <SidebarLink icon={Settings} text="Settings" />
          <SidebarLink icon={HelpCircle} text="Support" />
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
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {overviewData.map((stat, index) => (
              <StatCard key={index} icon={stat.icon} title={stat.name} value={stat.value} change={stat.change} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* User Growth */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Growth</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={UserGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#8884d8" name="Students" />
                  <Line type="monotone" dataKey="instructors" stroke="#82ca9d" name="Instructors" />
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
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Distribution and Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Course Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {courseDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
              <ul className="divide-y divide-gray-200">
                {[
                  { action: 'New course approved', details: 'Advanced Machine Learning', time: '2 hours ago' },
                  { action: 'User reported', details: 'Spam content in forums', time: '1 day ago' },
                  { action: 'Large transaction', details: '$5000 course bundle purchase', time: '3 days ago' },
                  { action: 'New instructor onboarded', details: 'Prof. Jane Doe - Data Science', time: '1 week ago' },
                ].map((item, index) => (
                  <li key={index} className="py-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-full mr-3">
                        <User className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.details} - {item.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Add New User', icon: Users },
                { name: 'Approve Course', icon: BookOpen },
                { name: 'Generate Report', icon: FileText },
                { name: 'System Backup', icon: Database },
              ].map((action, index) => (
                <button key={index} className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition duration-150 ease-in-out">
                  <action.icon className="h-8 w-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;