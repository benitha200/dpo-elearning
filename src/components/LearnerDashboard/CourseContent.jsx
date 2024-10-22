import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Play, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  List,
  ListItem,
  AspectRatio,
  useColorModeValue,
  Stack,
  IconButton
} from '@chakra-ui/react';
import API_URL from '../../Constants/Const';
import VideoQuizModal from './VideoQuizModal';
import LessonContentTabs from './LessonContentTabs';

// Quiz Component
const Quiz = ({ quizzes, onQuizComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const borderColor = useColorModeValue('blue.100', 'blue.700');
  const hoverBg = useColorModeValue('blue.50', 'blue.700');

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizzes.forEach(quiz => {
      if (selectedAnswers[quiz.id] === quiz.correctAnswer) {
        correct++;
      }
    });
    return (correct / quizzes.length) * 100;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    onQuizComplete(finalScore);
  };

  if (showResults) {
    return (
      <Box my={6} p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
        <Heading size="lg" mb={4}>Quiz Results</Heading>
        <Text fontSize="lg" mb={4}>Your score: {score.toFixed(1)}%</Text>
        {score >= 80 ? (
          <Alert status="success" mb={4}>
            <AlertIcon />
            <AlertDescription>
              Congratulations! You can continue with the lesson.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertDescription>
              You need to score at least 80% to continue. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <Button colorScheme="blue" onClick={onBack}>
          Try Again
        </Button>
      </Box>
    );
  }

  const currentQuestion = quizzes[currentQuestionIndex];

  return (
    <Box my={6} p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
      <Heading size="lg" mb={6}>Knowledge Check</Heading>
      <VStack spacing={6} align="stretch">
        <Text fontSize="lg">{currentQuestion.question}</Text>
        <RadioGroup
          onChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
          value={selectedAnswers[currentQuestion.id]}
        >
          <VStack spacing={3} align="stretch">
            {currentQuestion.options.map((option, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="md"
                p={3}
                _hover={{ bg: hoverBg }}
                cursor="pointer"
              >
                <Radio value={option} w="100%">
                  {option}
                </Radio>
              </Box>
            ))}
          </VStack>
        </RadioGroup>
        <HStack justify="space-between">
          <Button
            leftIcon={<ChevronLeft />}
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            isDisabled={currentQuestionIndex === 0}
            colorScheme="blue"
          >
            Previous Question
          </Button>
          {currentQuestionIndex === quizzes.length - 1 ? (
            <Button
              onClick={handleSubmit}
              isDisabled={Object.keys(selectedAnswers).length < quizzes.length}
              colorScheme="green"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              rightIcon={<ChevronRight />}
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              colorScheme="blue"
            >
              Next Question
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

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
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState({});

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
          const courseData = courseResponse.data.data;
          const allLessons = courseData.flatMap(lesson => {
            const mainLesson = {
              id: lesson.id,
              title: lesson.title,
              content: lesson.content,
              videoUrl: lesson.videoUrl,
              isMainLesson: true,
              quizzes: lesson.quizzes
            };
            const subLessons = lesson.subLessons.map(subLesson => ({
              ...subLesson,
              isMainLesson: false
            }));
            return [mainLesson, ...subLessons];
          });

          setCourse({
            ...courseData[0].course,
            lessons: allLessons
          });
          setFlatLessons(allLessons);

          const overallProgress = progressResponse?.data[0]?.progress || 0;
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
    setShowQuiz(false);
  };

  const handleNext = () => {
    const currentLesson = flatLessons[currentLessonIndex];

    if (currentLesson.quizzes?.length > 0 && !quizPassed[currentLesson.id]) {
      setShowQuiz(true);
    } else if (currentLessonIndex < flatLessons.length - 1) {
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
      setShowQuiz(false);
    }
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

    const ErrorAlert = ({message}) => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="bg-sky-100 border-l-4 border-sky-800 text-sky-800 p-4 rounded-md max-w-md">
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>
    );

  const handleFinalAction = () => {
    if (currentLessonIndex === flatLessons.length - 1) {
      navigate(`/assessment/${courseId}`);
    }
  };

  const handleQuizComplete = (score) => {
    if (score >= 80) {
      setQuizPassed(prev => ({
        ...prev,
        [flatLessons[currentLessonIndex].id]: true
      }));
      if (currentLessonIndex < flatLessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
        setShowQuiz(false);
        updateProgress();
      } else {
        handleFinalAction();
      }
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

  const renderContent = () => {
    const currentLesson = flatLessons[currentLessonIndex];
    const isLastLesson = currentLessonIndex === flatLessons.length - 1;
    const hasQuiz = currentLesson.quizzes?.length > 0;
  
    return (
      <Box flex="1">
        {currentLesson.videoUrl && hasQuiz ? (
          <VideoQuizModal
            videoUrl={currentLesson.videoUrl}
            quizzes={currentLesson.quizzes}
            onQuizComplete={(score) => handleQuizComplete(score)}
          />
        ) : (
          <AspectRatio ratio={16 / 9} mb={4} bg="black" borderRadius="md" overflow="hidden">
            {currentLesson.videoUrl ? (
              <iframe
                src={currentLesson.videoUrl}
                allowFullScreen
              />
            ) : (
              <Flex align="center" justify="center">
                <Play size={48} color="white" />
              </Flex>
            )}
          </AspectRatio>
        )}
  
        <Box className="prose">
          <Heading size="lg" mb={4} color="blue.700">
            {currentLesson.title}
          </Heading>
          {/* <Box dangerouslySetInnerHTML={{ __html: currentLesson.content }} /> */}
          <LessonContentTabs 
            lessonId={currentLesson.id}
            content={currentLesson.content}
          />
        </Box>
  
        <HStack justify="space-between" mt={6}>
          <Button
            leftIcon={<ChevronLeft />}
            onClick={handleBack}
            isDisabled={currentLessonIndex === 0}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Button
            rightIcon={<ChevronRight />}
            onClick={handleNext}
            isDisabled={hasQuiz && !quizPassed[currentLesson.id]}
            colorScheme={isLastLesson ? 'green' : 'blue'}
          >
            {isLastLesson ? 'Take Final Assessment' : 'Next'}
          </Button>
        </HStack>
      </Box>
    );
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error} />;
  if (!course) return <Text color="blue.700">No course data available.</Text>;

  return (
    <Box minH="100vh" bg="white">
      <Container maxW="container.xl" py={8}>
        <Button
          leftIcon={<ArrowLeft />}
          onClick={() => navigate('/courses')}
          variant="ghost"
          colorScheme="blue"
          mb={4}
        >
          Home
        </Button>
        
        <Heading size="xl" mb={4} color="blue.700">
          {course.title}
        </Heading>
        
        <Box position="relative" mb={4}>
          <Progress
            value={progress}
            size="sm"
            colorScheme="blue"
            borderRadius="full"
          />
          <Text textAlign="center" fontSize="sm" mt={1}>
            {progress}%
          </Text>
        </Box>

        <Stack direction={{ base: 'column', lg: 'row' }} spacing={8} mt={4}>
          {renderContent()}

          <Box w={{ base: 'full', lg: '25%' }}>
            <Heading size="lg" mb={4} color="blue.700">
              Lessons
            </Heading>
            <List spacing={2}>
              {flatLessons.map((lesson, index) => (
                <ListItem
                  key={lesson.id}
                  onClick={() => handleLessonClick(index)}
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                  bg={index === currentLessonIndex ? 'blue.500' : 'transparent'}
                  color={index === currentLessonIndex ? 'white' : 'inherit'}
                  _hover={{ bg: index === currentLessonIndex ? 'blue.600' : 'blue.50' }}
                  pl={lesson.isMainLesson ? 2 : 6}
                  fontWeight={lesson.isMainLesson ? 'bold' : 'normal'}
                >
                  {lesson.title}
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default CourseContent;