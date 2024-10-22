import React, { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  VStack,
  Text,
  Box,
  Alert,
  AlertIcon,
  useDisclosure,
  RadioGroup,
  Radio,
  AlertDialogHeader,
  AlertDialogFooter,
  Stack,
} from '@chakra-ui/react';

const VideoQuizModal = ({ videoUrl, quizzes, onQuizComplete }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const videoRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const timeRemaining = duration - currentTime;

    if (timeRemaining <= 30 && !showQuiz && !isOpen) {
      setPausedTime(currentTime); // Save the current time when pausing
      videoRef.current.pause();
      setShowQuiz(true);
      onOpen();
    }
  };

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
    
    if (finalScore >= 80) {
      onQuizComplete(finalScore);
      onClose();
      if (videoRef.current) {
        videoRef.current.currentTime = pausedTime; // Restore the video time
        videoRef.current.play();
      }
      setShowQuiz(false);
    }
  };

  const currentQuestion = quizzes[currentQuestionIndex];

  return (
    <Box position="relative" width="full">
      <Box ratio={16/9} width="full">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          style={{ width: '100%', height: '100%' }}
          onTimeUpdate={handleTimeUpdate}
        />
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              Knowledge Check
            </AlertDialogHeader>

            <AlertDialogBody>
              {showResults ? (
                <VStack spacing={4} align="stretch">
                  <Text>Your score: {score.toFixed(1)}%</Text>
                  {score >= 80 ? (
                    <Alert>
                      <AlertIcon />
                      Congratulations! You can continue with the video.
                    </Alert>
                  ) : (
                    <VStack spacing={4} align="stretch">
                      <Alert>
                        <AlertIcon />
                        You need to score at least 80% to continue. Please try again.
                      </Alert>
                      <Button
                        onClick={() => {
                          setShowResults(false);
                          setSelectedAnswers({});
                          setCurrentQuestionIndex(0);
                        }}
                      >
                        Try Again
                      </Button>
                    </VStack>
                  )}
                </VStack>
              ) : (
                <VStack spacing={6} align="stretch">
                  <Text>{currentQuestion.question}</Text>
                  <RadioGroup
                    onChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                    value={selectedAnswers[currentQuestion.id]}
                  >
                    <Stack direction="column" spacing={3}>
                      {currentQuestion.options.map((option, index) => (
                        <Box
                          key={index}
                          className="border rounded-md p-3 hover:bg-gray-50"
                        >
                          <Radio value={option} className="w-full">
                            {option}
                          </Radio>
                        </Box>
                      ))}
                    </Stack>
                  </RadioGroup>
                </VStack>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              {!showResults && (
                <Stack direction="row" spacing={4} className="w-full justify-between">
                  <Button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  {currentQuestionIndex === quizzes.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={Object.keys(selectedAnswers).length < quizzes.length}
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    >
                      Next
                    </Button>
                  )}
                </Stack>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default VideoQuizModal;