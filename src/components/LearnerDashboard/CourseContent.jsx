import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Play, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import API_URL from '../../Constants/Const';

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [flatLessons, setFlatLessons] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const [courseResponse, progressResponse] = await Promise.all([
          axios.get(`${API_URL}/api/lesson/byCourse/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          }),
          axios.get(`${API_URL}/api/progress/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
        ]);

        if (courseResponse.data.message === "No lessons found") {
          setCourse({ title: "No lessons available" });
          setFlatLessons([]);
        } else if (courseResponse.data.data && courseResponse.data.data.length > 0) {
          const courseData = courseResponse.data.data[0];
          const mainLesson = {
            id: courseData.id,
            title: courseData.title,
            content: courseData.content,
            videoUrl: courseData.videoUrl,
            isMainLesson: true,
            quizzes: courseData.quizzes
          };
          const subLessons = courseData.subLessons || [];
          const allLessons = [mainLesson, ...subLessons];

          setCourse({
            ...courseData.course,
            lessons: allLessons
          });
          setFlatLessons(allLessons);

          const overallProgress = progressResponse.data[0].progress;
          setProgress(overallProgress);
        } else {
          throw new Error('No course data found');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to fetch course content. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleLessonClick = (index) => {
    setCurrentLessonIndex(index);
    setShowDescription(false);
  };

  const handleNext = () => {
    if (currentLessonIndex < flatLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setShowDescription(false);
      updateProgress();
    } else {
      handleFinalAction();
    }
  };

  const handleBack = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setShowDescription(false);
    }
  };

  const handleFinalAction = () => {
    const currentLesson = flatLessons[currentLessonIndex];
    if (currentLessonIndex === flatLessons.length - 1) {
      navigate(`/assessment/${courseId}`);
    } else if (currentLesson.quizzes && currentLesson.quizzes.length > 0) {
      navigate(`/quiz/${currentLesson.id}?courseId=${courseId}`);
    } else {
      console.error('No quiz or final assessment available');
    }
  };

  const updateProgress = async () => {
    const newProgress = Math.round(((currentLessonIndex + 1) / flatLessons.length) * 100);
    setProgress(newProgress);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/progress/upsert`, {
        courseId: courseId,
        lessonId: flatLessons[currentLessonIndex].id,
        progress: newProgress
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  useEffect(() => {
    if (flatLessons.length > 0) {
      const timer = setTimeout(() => {
        setShowDescription(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentLessonIndex, flatLessons]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error} />;
  if (!course) return <p className="text-sky-800">No course data available.</p>;

  const currentLesson = flatLessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === flatLessons.length - 1;

  return (
    <div className="min-h-screen min-w-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-sky-800 hover:text-sky-600 mb-4"
        >
          <ArrowLeft className="mr-2" size={20} />
          Home
        </button>
        <h1 className="text-3xl font-bold mb-4 text-sky-800">{course.title}</h1>
        <div className="relative w-full bg-sky-100 rounded-full h-2.5 mb-4">
          <div 
            className="bg-sky-800 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
          <div className="text-center text-sm text-sky-800 font-medium">
            {progress}%
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-4 pt-4">
          {/* Main content area */}
          <div className="flex-1">
            {/* Video player */}
            <div className="bg-black h-0 pb-[56.25%] mb-4 relative">
              {currentLesson.videoUrl ? (
                <iframe
                  src={currentLesson.videoUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Play size={48} color="white" />
                </div>
              )}
              {showDescription && (
                <div className="absolute bottom-0 left-0 right-0 bg-sky-800 bg-opacity-70 text-white p-4">
                  <h3 className="font-bold">{currentLesson.title}</h3>
                </div>
              )}
            </div>

            {/* Video controls */}
            <div className="flex justify-between mb-4">
              <button
                onClick={handleBack}
                disabled={currentLessonIndex === 0}
                className="flex items-center px-4 py-2 bg-sky-800 text-white rounded-md disabled:opacity-50"
              >
                <ChevronLeft className="mr-2" size={20} />
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`flex items-center px-4 py-2 ${isLastLesson ? 'bg-green-500 hover:bg-green-600' : 'bg-sky-800 hover:bg-sky-700'} text-white rounded-md`}
              >
                {isLastLesson ? 'Take Final Assessment' : 'Next'}
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>

            {/* Lesson content */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-sky-800">{currentLesson.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <h3 className="text-xl font-bold mb-4 text-sky-800">Lessons</h3>
            <ul>
              {flatLessons.map((lesson, index) => (
                <li
                  key={lesson.id}
                  className={`cursor-pointer p-2 rounded ${
                    index === currentLessonIndex
                      ? 'bg-sky-800 text-white'
                      : 'hover:bg-sky-100'
                  }`}
                  onClick={() => handleLessonClick(index)}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white py-12">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-10 w-40 bg-sky-200 rounded mb-8"></div>
        <div className="h-12 bg-sky-200 rounded mb-4"></div>
        <div className="h-6 w-3/4 bg-sky-200 rounded mb-12"></div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-grow space-y-10">
            <div className="h-64 bg-sky-200 rounded"></div>
            <div className="h-96 bg-sky-200 rounded"></div>
          </div>
          <div className="w-full lg:w-80 space-y-6">
            <div className="h-40 bg-sky-200 rounded"></div>
            <div className="h-40 bg-sky-200 rounded"></div>
            <div className="h-40 bg-sky-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-white">
    <div className="bg-sky-100 border-l-4 border-sky-800 text-sky-800 p-4 rounded-md max-w-md">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  </div>
);

export default CourseContent;