import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { ChevronRightIcon, DownloadIcon, CheckCircleIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import API_URL from '../../Constants/Const';
import { Home } from 'lucide-react';

const MotionBox = motion(Box);

// Utility function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Custom axios instance with increased timeout
const apiClient = axios.create({
  timeout: 300000, // 30 seconds
});

const AssessmentPage = () => {
  const { courseId } = useParams();
  const [showQuestions, setShowQuestions] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const toast = useToast();

  // Retry submission function with exponential backoff
  const submitWithRetry = async (submissionData, maxRetries = 3) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await apiClient.post(
          `${API_URL}/api/assessment/submit/${courseId}`,
          submissionData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          }
        );

        return response.data;
      } catch (error) {
        console.log(`Attempt ${attempt + 1} failed:`, error);

        if (attempt === maxRetries - 1) {
          throw error; // Last attempt failed
        }

        // Calculate delay with exponential backoff (2^attempt * 1000ms)
        const backoffDelay = Math.min(3000 * Math.pow(2, attempt), 8000);
        await delay(backoffDelay);

        // Show retry toast
        toast({
          title: 'Retrying submission',
          description: `Attempt ${attempt + 2} of ${maxRetries}...`,
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    const currentQuestion = quizData[currentQuestionIndex];
    const newAnswer = {
      answer: selectedAnswer,
      assessmentId: currentQuestion.id,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setSubmitting(true);

      // Show submission started toast
      toast({
        title: 'Submitting Assessment',
        description: 'Please wait while we process your submission...',
        status: 'info',
        duration: null, // Don't auto-dismiss
        isClosable: false,
      });

      try {
        const submissionData = { answers: updatedAnswers };

        // Attempt submission with retry logic
        const result = await submitWithRetry(submissionData);

        // Close the submitting toast
        toast.closeAll();

        setAssessmentCompleted(true);
        setScore(result.data.score);
        setPercentage(parseInt(result.data?.percentage || 0));

        toast({
          title: 'Success!',
          description: 'Assessment submitted successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error submitting assessment:', error);

        // Close the submitting toast
        toast.closeAll();

        // Show detailed error message
        toast({
          title: 'Submission Error',
          description: `Unable to submit assessment. ${error.response?.status === 504 ?
            'The server is taking too long to respond. Please try again in a few minutes.' :
            'Please try again or contact support if the issue persists.'}`,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });

        // Optional: Save answers to localStorage as backup
        localStorage.setItem(`assessment_answers_${courseId}`, JSON.stringify(updatedAnswers));
      } finally {
        setSubmitting(false);
      }
    }
  };




  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setAssessmentCompleted(false);
    setShowQuestions(true);
  };


  const fetchAssessmentWithRetry = async (maxRetries = 3) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await apiClient.get(
          `${API_URL}/api/assessment/course/${courseId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        return response.data;
      } catch (error) {
        console.log(`Attempt ${attempt + 1} failed:`, error);
        
        if (attempt === maxRetries - 1) {
          throw error; // Last attempt failed
        }
        
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 8000);
        await delay(backoffDelay);
        
        toast({
          title: 'Retrying connection',
          description: `Attempt ${attempt + 2} of ${maxRetries}...`,
          status: 'info',
          duration: 20000,
          isClosable: true,
        });
      }
    }
  };

  const handleStartAssessment = async () => {
    setLoading(true);
    setError(null);

    // Show loading toast
    toast({
      title: 'Loading Assessment',
      description: 'Please wait while we prepare your assessment...',
      status: 'info',
      duration: null,
      isClosable: false,
    });

    try {
      const result = await fetchAssessmentWithRetry();
      
      // Close loading toast
      toast.closeAll();
      
      if (result && result.data) {
        setQuizData(result.data);
        setShowQuestions(true);
        
        toast({
          title: 'Assessment Loaded',
          description: 'You can now begin your assessment.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching assessment:', err);
      
      // Close loading toast
      toast.closeAll();
      
      setError('Failed to fetch assessment data.');
      
      toast({
        title: 'Error Loading Assessment',
        description: err.response?.status === 504 
          ? 'The server is taking too long to respond. Please try again in a few minutes.'
          : 'Failed to load assessment data. Please try again or contact support.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <Flex justify="center" align="center" height="100vh">Loading assessment...</Flex>;
  if (error) return <Text color="red.500" textAlign="center" p={4}>{error}</Text>;

  if (assessmentCompleted) {
    const passed = percentage >= 80;

    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        minHeight="100vh"
        bg="linear-gradient(to bottom right, #E6F3FF, #FFFFFF)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Card maxW="md" w="full" textAlign="center">
          <CardHeader>
            <Heading size="xl" color={passed ? "green.500" : "blue.700"}>
              {passed ? "Congratulations! 🎉" : "Assessment Completed!"}
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6}>
              <CheckCircleIcon boxSize="16" color={passed ? "green.500" : "blue.500"} />
              <Text fontSize="xl">Your Score:</Text>
              <Heading size="2xl" color={passed ? "green.500" : "blue.700"}>
                {score} / {quizData.length} ({percentage}%)
              </Heading>
              <Text fontSize="lg" color={passed ? "green.600" : "gray.600"}>
                {passed
                  ? "Fantastic job! You've aced the assessment with flying colors! Your hard work has truly paid off. 🌟"
                  : "Keep practicing and try again!"}
              </Text>
              {passed ? (
                <>
                  <Text fontSize="md" color="gray.600">
                    Your certificate has been sent to your registered email.
                  </Text>
                  <Button
                    leftIcon={<Home />}
                    colorScheme="green"
                    // onClick={generateCertificate}
                    w="full"
                  >
                    {/* Download Certificate */}
                    Go Back Home
                  </Button>
                </>
              ) : (
                <Button
                  leftIcon={<RepeatIcon />}
                  colorScheme="blue"
                  onClick={handleRestartQuiz}
                  w="full"
                >
                  Restart Quiz
                </Button>
              )}
            </VStack>
          </CardBody>
        </Card>
      </MotionBox>
    );
  }


  if (!showQuestions) {
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        minHeight="100vh"
        bg="linear-gradient(to bottom right, #E6F3FF, #FFFFFF)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Card maxW="2xl" w="full">
          <CardHeader>
            <Heading size="xl" color="blue.700">Assessment Instructions</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="lg" mb={4} color="gray.600">
              Please read the following instructions carefully before starting the assessment:
            </Text>
            <VStack align="stretch" spacing={2} mb={6} color="gray.700">
              <Text>• Ensure you have a stable internet connection.</Text>
              <Text>• Each question is timed, so make sure to answer promptly.</Text>
              <Text>• You cannot go back to previous questions once you have answered them.</Text>
              <Text>• Your progress will be automatically saved, and your score will be displayed at the end.</Text>
            </VStack>
            <Button
              rightIcon={<ChevronRightIcon />}
              colorScheme="blue"
              onClick={handleStartAssessment}
              w="full"
            >
              Start Assessment
            </Button>
          </CardBody>
        </Card>
      </MotionBox>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      minHeight="100vh"
      bg="linear-gradient(to bottom right, #E6F3FF, #FFFFFF)"
      p={4}
    >
      <Container maxW="3xl">
        <Card>
          <CardHeader>
            <Heading size="lg" color="blue.700">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </Heading>
          </CardHeader>
          <CardBody>
            <Progress value={(currentQuestionIndex / quizData.length) * 100} mb={6} colorScheme="blue" />
            <Text fontSize="xl" mb={6} color="blue.700">{currentQuestion.question}</Text>
            <RadioGroup value={selectedAnswer} onChange={setSelectedAnswer}>
              <Stack spacing={3}>
                {currentQuestion.options.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Button
              mt={6}
              w="full"
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={!selectedAnswer || submitting}
              isLoading={submitting}
              loadingText="Submitting..."
            >
              {currentQuestionIndex === quizData.length - 1 ? 'Finish Assessment' : 'Next Question'}
            </Button>
          </CardBody>
        </Card>
      </Container>
    </MotionBox>
  );
};

export default AssessmentPage;