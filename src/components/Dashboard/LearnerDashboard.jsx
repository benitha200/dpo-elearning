import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, BookOpen, Award, Bell, User, Menu, X, Home, Book, BarChart2, Settings } from 'lucide-react';

const progressData = [
  { name: 'Web Dev', completed: 75, total: 100 },
  { name: 'Data Science', completed: 45, total: 100 },
  { name: 'UX Design', completed: 60, total: 100 },
  { name: 'Mobile Dev', completed: 30, total: 100 },
];

const LearnerDashboard = () => {
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
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const SidebarLink = ({ icon: Icon, text }) => (
    <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-md transition duration-150 ease-in-out">
      <Icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{text}</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex w-full">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 shadow-lg`}>
        <div className="p-5 flex items-center justify-between border-b border-gray-200">
          <span className="text-2xl font-bold text-sky-600">DPO E-Learning</span>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink icon={Home} text="Dashboard" />
          <SidebarLink icon={Book} text="My Courses" />
          <SidebarLink icon={BarChart2} text="Progress" />
          <SidebarLink icon={Calendar} text="Schedule" />
          <SidebarLink icon={Award} text="Certificates" />
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
                  <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-sky-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
                          <Calendar className="h-5 w-5 text-sky-500 mr-2" />
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
                          <Clock className="h-5 w-5 text-sky-500 mr-2" />
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
                      <item.icon className="h-8 w-8 text-sky-600 mb-2" />
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearnerDashboard;