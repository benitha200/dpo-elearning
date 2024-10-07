import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Video, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const initialScheduleData = [
  { event: 'Web Dev Live Session', time: '10:00 AM - 11:30 AM', date: '2024-09-15', type: 'live' },
  { event: 'Data Science Project Due', time: '11:59 PM', date: '2024-09-18', type: 'assignment' },
  { event: 'UX Design Workshop', time: '2:00 PM - 4:00 PM', date: '2024-09-20', type: 'workshop' },
  { event: 'Mobile Dev Q&A', time: '3:00 PM - 4:00 PM', date: '2024-09-22', type: 'qa' },
  { event: 'Python Basics Course', time: '9:00 AM - 10:30 AM', date: '2024-09-25', type: 'course' },
];

const eventTypeIcons = {
  live: <Video className="h-5 w-5 text-blue-500" />,
  assignment: <BookOpen className="h-5 w-5 text-green-500" />,
  workshop: <Users className="h-5 w-5 text-purple-500" />,
  qa: <Users className="h-5 w-5 text-yellow-500" />,
  course: <BookOpen className="h-5 w-5 text-red-500" />,
};

const eventTypeColors = {
  live: 'bg-blue-100 text-blue-800',
  assignment: 'bg-green-100 text-green-800',
  workshop: 'bg-purple-100 text-purple-800',
  qa: 'bg-yellow-100 text-yellow-800',
  course: 'bg-red-100 text-red-800',
};

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const [newEvent, setNewEvent] = useState({ event: '', date: '', time: '', type: 'live' });

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.event && newEvent.date && newEvent.time) {
      setScheduleData(prev => [...prev, newEvent]);
      setNewEvent({ event: '', date: '', time: '', type: 'live' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
          <div className="flex items-center space-x-4">
            <button onClick={prevWeek} className="p-2 rounded-full hover:bg-gray-200">
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-700">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextWeek} className="p-2 rounded-full hover:bg-gray-200">
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
              <ul className="divide-y divide-gray-200">
                {scheduleData.map((item, index) => (
                  <li key={index} className="py-4 flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {eventTypeIcons[item.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-sm text-gray-500">{item.date} | {item.time}</p>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${eventTypeColors[item.type]}`}>
                        {item.type}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
              <ul className="space-y-3">
                {scheduleData.filter(item => new Date(item.date).toDateString() === new Date().toDateString()).map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{item.time}</span>
                    <span className="ml-2 text-sm font-medium text-gray-900">{item.event}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Add Event</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="event"
                  value={newEvent.event}
                  onChange={handleInputChange}
                  placeholder="Event Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="live">Live Session</option>
                  <option value="assignment">Assignment</option>
                  <option value="workshop">Workshop</option>
                  <option value="qa">Q&A</option>
                  <option value="course">Course</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition duration-300"
                >
                  Add Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;