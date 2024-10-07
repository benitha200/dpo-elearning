import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../Constants/Const';

const QuizComponent = () => {
  const { lessonId } = useParams();
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get('courseId');
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFinalQuiz, setIsFinalQuiz] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [quizResponse, courseResponse] = await Promise.all([
          axios.get(`${API_URL}/api/quiz/byLesson/${lessonId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          }),
          axios.get(`${API_URL}/api/lesson/byCourse/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
        ]);

        if (quizResponse.data && quizResponse.data.data && quizResponse.data.data.length > 0) {
          setQuizData(quizResponse.data.data);
        } else {
          throw new Error('No quiz data found');
        }

        // Check if this is the final quiz
        if (courseResponse.data && courseResponse.data.data && courseResponse.data.data.length > 0) {
          const courseData = courseResponse.data.data[0];
          const allLessons = [courseData, ...(courseData.subLessons || [])];
          const lastLesson = allLessons[allLessons.length - 1];
          setIsFinalQuiz(lastLesson.id === lessonId);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch quiz data. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [lessonId, courseId]);

  const handleSubmit = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReturnToCourse = () => {
    if (courseId) {
      navigate(`/course/${courseId}`);
    } else {
      console.error('No course ID available');
      navigate(`/course/${lessonId}`);
    }
  };

  const handleTakeFinalAssessment = () => {
    navigate('/assessment');
  };

  const calculatePercentageScore = () => {
    return Math.round((quizScore / quizData.length) * 100);
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (quizData.length === 0) return <p>No quiz data available.</p>;

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="min-h-screen min-w-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-sky-800">Lesson Quiz</h1>
        
        {quizCompleted ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-sky-800">Quiz Completed</h2>
            <p className="text-lg mb-4">Your score: {calculatePercentageScore()}%</p>
            {isFinalQuiz ? (
              <button
                onClick={handleTakeFinalAssessment}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Take Final Assessment
              </button>
            ) : (
              <button
                onClick={handleReturnToCourse}
                className="px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-700 transition-colors"
              >
                Return to Course
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-sky-800">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </h2>
            <h3 className="text-xl mb-4 text-sky-800">{currentQuestion.question}</h3>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="quizOption"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="form-radio text-sky-800"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="mt-4 px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;