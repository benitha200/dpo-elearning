import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useLocation, Routes } from 'react-router-dom';
import { X, Menu, Home, Book, Calendar, Award, Bell, User, Settings2, HelpCircle, Shield, Database, FileText, DollarSign, BookOpen, Users } from 'lucide-react';

// Import page components
import Dashboard from './components/LearnerDashboard/Dashboard';
import MyCourses from './components/LearnerDashboard/MyCourses';
import Schedule from './components/LearnerDashboard/Schedule';
import Certificates from './components/LearnerDashboard/Certificates';
import Progress from './components/LearnerDashboard/Progress.Jsx';
import Settings from './components/LearnerDashboard/Settings';
import CourseContent from './components/LearnerDashboard/CourseContent';
import LessonContent from './components/LearnerDashboard/LessonContent';
import InstructorDashboard from './components/InstructorDashboard/Dashboard';
import MyCoursesInstructor from './components/InstructorDashboard/MyCoursesInstructor';
import StudentsProgress from './components/InstructorDashboard/StudentsProgress';
import AssignmentsPage from './components/InstructorDashboard/AssignmentsPage';
import DiscussionPage from './components/InstructorDashboard/DiscussionPage';
import ReviewsPage from './components/InstructorDashboard/ReviewsPage';
import SettingsPageInstructor from './components/InstructorDashboard/SettingsPage';
import AdminDashboard from './components/AdminDashboard/Dashboard';
import UsersPage from './components/AdminDashboard/Users';
import CoursesPageAdmin from './components/AdminDashboard/CoursesPage';
import FinancePage from './components/AdminDashboard/Financepage';
import ReportsPage from './components/AdminDashboard/ReportsPage';
import DataManagementPage from './components/AdminDashboard/DataManagementPage';
import SecurityPage from './components/AdminDashboard/SecurityPage';
import SettingsPageAdmin from './components/AdminDashboard/SettingspageAdmin';
import SupportPage from './components/AdminDashboard/SupportPage';

// Sidebar Link Component
const SidebarLink = ({ icon: Icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-150 ease-in-out ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
      <Icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{text}</span>
    </Link>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState('admin');

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

  if (role === 'learner') {
    return (
      <Router>
        <div className="min-h-screen bg-gray-100 flex w-full">
          {/* Sidebar */}
          <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 shadow-lg`}>
            <div className="p-5 flex items-center justify-between border-b border-gray-200">
              <span className="text-2xl font-bold text-blue-600">DPO E-Learning</span>
              <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <SidebarLink icon={Home} text="Dashboard" to="/" />
              <SidebarLink icon={Book} text="My Courses" to="/courses" />
              <SidebarLink icon={Book} text="Progress" to="/progress" />
              <SidebarLink icon={Calendar} text="Schedule" to="/schedule" />
              <SidebarLink icon={Award} text="Certificates" to="/certificates" />
              <SidebarLink icon={Settings2} text="Settings" to="/settings" />
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col w-full">
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
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">John Doe</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<MyCourses />} />
                  <Route path="/course/:courseId" element={<CourseContent />} />
                  <Route path="/course/:courseId/lesson/:lessonId" element={<LessonContent />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    );
  }
  if (role === 'instructor') {
    return (
      <Router>
        <div className="min-h-screen bg-gray-100 flex w-full">
          {/* Sidebar */}
          <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 shadow-lg`}>
            <div className="p-5 flex items-center justify-between border-b border-gray-200">
              <span className="text-2xl font-bold text-blue-600">DPO E-Learning Instructor</span>
              <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <SidebarLink icon={Home} text="Dashboard" to="/" />
              <SidebarLink icon={Book} text="My Courses" to="/courses" />
              <SidebarLink icon={Book} text="Students" to="/progress" />
              <SidebarLink icon={Calendar} text="Assignments" to="/schedule" />
              <SidebarLink icon={Award} text="Discussion" to="/certificates" />
              <SidebarLink icon={Award} text="Reviews" to="/reviews" />
              <SidebarLink icon={Settings2} text="Settings" to="/settings" />
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col w-full">
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
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">John Doe</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<InstructorDashboard />} />
                  <Route path="/courses" element={<MyCoursesInstructor />} />
                  <Route path="/course/:courseId" element={<CourseContent />} />
                  <Route path="/course/:courseId/lesson/:lessonId" element={<LessonContent />} />
                  <Route path="/progress" element={<StudentsProgress />} />
                  <Route path="/schedule" element={<AssignmentsPage />} />
                  <Route path="/certificates" element={<DiscussionPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/settings" element={<SettingsPageInstructor />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    );
  }
  if (role === 'admin') {
    return (
      <Router>
        <div className="min-h-screen bg-gray-100 flex w-full">
          {/* Sidebar */}
          <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 shadow-lg`}>
            <div className="p-5 flex items-center justify-between border-b border-gray-200">
              <span className="text-2xl font-bold text-blue-600">DPO E-Learning Admin</span>
              <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <SidebarLink icon={Home} text="Dashboard" to="/" />
              <SidebarLink icon={Users} text="Users" to="/users" />
              <SidebarLink icon={BookOpen} text="Courses" to="/courses" />
              <SidebarLink icon={DollarSign} text="Finance" to="/finance" />
              <SidebarLink icon={FileText} text="Reports" to="/reports" />
              <SidebarLink icon={Database} text="Data Managment" to="/data-managment" />
              <SidebarLink icon={Shield} text="Security" to="/security" />
              <SidebarLink icon={Settings2} text="Settings" to="/settings" />
              <SidebarLink icon={HelpCircle} text="Support" to="/support" />
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col w-full">
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
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">John Doe</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/courses" element={<CoursesPageAdmin />} />
                  <Route path="/finance" element={<FinancePage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/data-managment" element={<DataManagementPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="/settings" element={<SettingsPageAdmin />} />
                  <Route path="/support" element={<SupportPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    );
  }

};

export default App;