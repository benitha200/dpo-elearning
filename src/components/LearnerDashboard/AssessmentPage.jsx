import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { ChevronRightIcon, DownloadIcon, CheckCircleIcon } from '@chakra-ui/icons';
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

const MotionBox = motion(Box);

const AssessmentPage = () => {
  const { courseId } = useParams();
  const [showQuestions, setShowQuestions] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const toast = useToast();

  const handleStartAssessment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/assessment/course/${courseId}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      if (response.data && response.data.data) {
        setQuizData(response.data.data);
        setShowQuestions(true);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch quiz data. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to fetch quiz data. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (selectedAnswer === quizData[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setAssessmentCompleted(true);
    }
  };

  const generateCertificate = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setTextColor(0, 101, 163);
    doc.text('Certificate of Completion', 105, 40, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`This is to certify that you have successfully`, 105, 70, { align: 'center' });
    doc.text(`completed the assessment with a score of`, 105, 80, { align: 'center' });
    doc.setFontSize(20);
    doc.setTextColor(0, 128, 0);
    doc.text(`${score}/${quizData.length}`, 105, 100, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(128, 128, 128);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 120, { align: 'center' });
    doc.save('certificate.pdf');
  };

  if (loading) return <Flex justify="center" align="center" height="100vh">Loading assessment...</Flex>;
  if (error) return <Text color="red.500" textAlign="center" p={4}>{error}</Text>;

  if (assessmentCompleted) {
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
            <Heading size="xl" color="blue.700">Assessment Completed!</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6}>
              <CheckCircleIcon boxSize="16" color="green.500" />
              <Text fontSize="xl">Your Score:</Text>
              <Heading size="2xl" color="blue.700">{score} / {quizData.length}</Heading>
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme="blue"
                onClick={generateCertificate}
                w="full"
              >
                Download Certificate
              </Button>
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
              isDisabled={!selectedAnswer}
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