import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import {
  Box,
  Heading,
  VStack,
  Container,
  Divider,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  Button,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Badge,
  HStack,
  Collapse,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Textarea
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { EditIcon, AddIcon, ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import CourseForm from './CourseForm';
import API_URL from '../../../Constants/Const';
import LessonModal from '../Lessons/LessonModal';
import LessonEditModal from '../Lessons/LessonEditModal';
import AddLessonModal from '../Lessons/AddLessonModal';

const ViewEditCourse = ({ course, onSubmit, onCancel }) => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQuizOpen,
    onOpen: onQuizOpen,
    onClose: onQuizClose
  } = useDisclosure();
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(true);
  const toast = useToast();

  const [quizData, setQuizData] = useState([
    {
      question: "",
      options: ["", "", ""],
      correctAnswer: "",
    }
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [savingProgress, setSavingProgress] = useState(0);
  const [viewQuizData, setViewQuizData] = useState([]);
  const [viewLessonData, setViewLessonData] = useState(null);
  const { isOpen: isViewQuizOpen, onOpen: onViewQuizOpen, onClose: onViewQuizClose } = useDisclosure();
  const { isOpen: isViewLessonOpen, onOpen: onViewLessonOpen, onClose: onViewLessonClose } = useDisclosure();
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  const headingColor = useColorModeValue('teal.600', 'teal.200');

  useEffect(() => {
    if (course && course.id) {
      fetchLessons(course.id);
    }
  }, [course]);

  const fetchLessons = async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/lesson/byCourse/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (Array.isArray(response.data.data)) {
        setLessons(response.data.data);
      } else {
        throw new Error('Received invalid data format from the server');
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setError('Error fetching lessons. Please try again later.');
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };


  const [editingLesson, setEditingLesson] = useState(null);

  const handleAddLesson = () => {
    setIsAddLessonModalOpen(true);
  };

  const handleCloseAddLessonModal = () => {
    setIsAddLessonModalOpen(false);
  };

  const handleLessonAdded = () => {
    fetchLessons(course.id);
    toast({
      title: "Lesson added",
      description: "The new lesson has been successfully added to the course.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson({
      ...lesson,
      content: lesson.content // Assuming content is HTML
    });
    onOpen();
  };

  const handleLessonInputChange = (field, value) => {
    setEditingLesson(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/api/lesson/update/${editingLesson.id}`,
        editingLesson,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      if (response.status === 200) {
        toast({
          title: "Lesson updated",
          description: "The lesson has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchLessons(course.id); // Refresh the lessons list
        onClose();
      }
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast({
        title: "Error",
        description: "Failed to update the lesson. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleAddLesson = () => {
  //   if (course && course.id) {
  //     navigate(`/add-lesson/${course.id}`);
  //   } else {
  //     console.error('Course ID is not available');
  //   }
  // };

  const toggleEditCourse = () => setIsEditCourseOpen(!isEditCourseOpen);

  const handleQuizInputChange = (questionIndex, field, value, optionIndex) => {
    setQuizData(prevQuizData => {
      const newQuizData = [...prevQuizData];
      if (field === 'options') {
        newQuizData[questionIndex].options[optionIndex] = value;
      } else {
        newQuizData[questionIndex][field] = value;
      }
      return newQuizData;
    });
  };

  const addQuestion = () => {
    setQuizData(prevQuizData => [
      ...prevQuizData,
      {
        question: "",
        options: ["", "", ""],
        correctAnswer: "",
      }
    ]);
  };

  const removeQuestion = (index) => {
    setQuizData(prevQuizData => prevQuizData.filter((_, i) => i !== index));
  };

  const handleAddQuiz = (lessonId) => {
    setSelectedLesson(lessons.find(lesson => lesson.id === lessonId));
    setQuizData([
      {
        question: "",
        options: ["", "", ""],
        correctAnswer: "",
      }
    ]);
    onQuizOpen();
  };

  const handleSaveQuiz = async () => {
    setIsSaving(true);
    setSavingProgress(0);
    let successCount = 0;

    for (let i = 0; i < quizData.length; i++) {
      try {
        const response = await fetch(`${API_URL}/api/quiz/create/${selectedLesson.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(quizData[i]),
        });

        if (!response.ok) {
          throw new Error(`Failed to create quiz question ${i + 1}`);
        }

        const result = await response.json();
        console.log(`Question ${i + 1} saved:`, result);
        successCount++;
      } catch (error) {
        console.error(`Error adding quiz question ${i + 1}:`, error);
        toast({
          title: "Error",
          description: `Failed to add question ${i + 1}. ${error.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      setSavingProgress(((i + 1) / quizData.length) * 100);
    }

    setIsSaving(false);

    if (successCount === quizData.length) {
      toast({
        title: "Quiz added",
        description: "All questions have been successfully added to the lesson.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onQuizClose();
      fetchLessons(course.id);
    } else if (successCount > 0) {
      toast({
        title: "Partial success",
        description: `${successCount} out of ${quizData.length} questions were added successfully.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to add any questions. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewQuiz = async (lessonId) => {
    try {
      const response = await axios.get(`${API_URL}/api/quiz/byLesson/${lessonId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setViewQuizData(response.data.data);
      onViewQuizOpen();
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quiz data. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewLesson = async (lessonId) => {
    try {
      const response = await axios.get(`${API_URL}/api/lesson/single/${lessonId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data.data);
      setViewLessonData(response.data.data);
      onViewLessonOpen();
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lesson data. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack
        spacing={8}
        align="stretch"
        bg={bgColor}
        borderRadius="xl"
        boxShadow="xl"
        p={8}
        borderWidth={1}
        borderColor={borderColor}
      >
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={2} color={headingColor}>
            {course ? course.title : 'New Course'}
          </Heading>
          <Divider my={4} borderColor={borderColor} />
        </Box>

        <Box>
          <Button
            onClick={toggleEditCourse}
            rightIcon={isEditCourseOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            colorScheme="teal"
            variant="outline"
            width="100%"
            mb={4}
          >
            {isEditCourseOpen ? 'Hide' : 'Show'} Edit Course
          </Button>
          <Collapse in={isEditCourseOpen} animateOpacity>
            <CourseForm
              course={course}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          </Collapse>
        </Box>

        {course && (
          <Box>
            <Heading as="h3" size="lg" mb={4} color={headingColor}>
              Course Lessons
            </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={handleAddLesson}
              mb={6}
              size="lg"
              boxShadow="md"
            >
              Add New Lesson
            </Button>
            {loading ? (
              <Box textAlign="center" py={10}>
                <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
              </Box>
            ) : error ? (
              <Box textAlign="center" py={10}>
                <Text color="red.500" fontSize="lg">{error}</Text>
              </Box>
            ) : lessons.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text color="gray.500" fontSize="lg">No lessons found for this course.</Text>
              </Box>
            ) : (
              <Box overflowX="auto">
                <Table variant="simple" colorScheme="teal">
                  <TableCaption>List of lessons for {course.title}</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Content</Th>
                      <Th>Video</Th>
                      <Th>Sub-lessons</Th>
                      <Th>Quizzes</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {lessons.map((lesson) => (
                      <Tr key={lesson.id} _hover={{ bg: hoverBgColor }}>
                        <Td fontWeight="semibold">{lesson.title}</Td>
                        <Td>
                          <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(lesson.content.substring(0, 50) + '...')
                          }} />
                        </Td>
                        <Td>
                          <Badge colorScheme={lesson.videoUrl ? "green" : "red"}>
                            {lesson.videoUrl ? 'Available' : 'Not available'}
                          </Badge>
                        </Td>
                        <Td isNumeric>{lesson.subLessons?.length || 0}</Td>
                        <Td isNumeric>{lesson.quizzes?.length || 0}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Tooltip label="Edit Lesson" hasArrow>
                              <IconButton
                                icon={<EditIcon />}
                                onClick={() => handleEditLesson(lesson)}
                                aria-label="Edit Lesson"
                                colorScheme="blue"
                                variant="outline"
                              />
                            </Tooltip>
                            <Button
                              colorScheme='orange'
                              size="sm"
                              onClick={() => handleAddQuiz(lesson.id)}
                            >
                              Add Quiz
                            </Button>
                            <Button
                              colorScheme='green'
                              size="sm"
                              onClick={() => handleViewQuiz(lesson.id)}
                            >
                              View Quiz
                            </Button>
                            <Button
                              colorScheme='purple'
                              size="sm"
                              onClick={() => handleViewLesson(lesson.id)}
                            >
                              View Lesson
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
        )}
      </VStack>

      <LessonEditModal
        isOpen={isOpen}
        onClose={onClose}
        editingLesson={editingLesson}
        handleLessonInputChange={handleLessonInputChange}
        handleSaveEdit={handleSaveEdit}
        loading={loading}
      />


      <Modal isOpen={isQuizOpen} onClose={onQuizClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Quiz to {selectedLesson?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              {quizData.map((question, questionIndex) => (
                <Box key={questionIndex} w="100%" p={4} borderWidth={1} borderRadius="md">
                  <HStack justifyContent="space-between" mb={2}>
                    <Heading size="sm">Question {questionIndex + 1}</Heading>
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => removeQuestion(questionIndex)}
                      aria-label="Remove question"
                      size="sm"
                      colorScheme="red"
                    />
                  </HStack>
                  <FormControl>
                    <FormLabel>Question</FormLabel>
                    <Input
                      value={question.question}
                      onChange={(e) => handleQuizInputChange(questionIndex, 'question', e.target.value)}
                    />
                  </FormControl>
                  {question.options.map((option, optionIndex) => (
                    <FormControl key={optionIndex} mt={2}>
                      <FormLabel>Option {optionIndex + 1}</FormLabel>
                      <Input
                        value={option}
                        onChange={(e) => handleQuizInputChange(questionIndex, 'options', e.target.value, optionIndex)}
                      />
                    </FormControl>
                  ))}
                  <FormControl mt={2}>
                    <FormLabel>Correct Answer</FormLabel>
                    <Input
                      value={question.correctAnswer}
                      onChange={(e) => handleQuizInputChange(questionIndex, 'correctAnswer', e.target.value)}
                    />
                  </FormControl>
                </Box>
              ))}
              <Button leftIcon={<AddIcon />} onClick={addQuestion} colorScheme="teal">
                Add Another Question
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack width="100%" spacing={4}>
              {isSaving && (
                <Box width="100%">
                  <Text mb={2}>Saving questions...</Text>
                  <Progress value={savingProgress} size="sm" colorScheme="blue" />
                </Box>
              )}
              <HStack width="100%" justifyContent="flex-end">
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleSaveQuiz}
                  isLoading={isSaving}
                  loadingText="Saving..."
                >
                  Save Quiz
                </Button>
                <Button variant="ghost" onClick={onQuizClose} isDisabled={isSaving}>
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isViewQuizOpen} onClose={onViewQuizClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              {viewQuizData.map((quiz, index) => (
                <Box key={index} borderWidth={1} borderRadius="md" p={4}>
                  <Text fontWeight="bold">Question {index + 1}: {quiz.question}</Text>
                  <VStack align="start" mt={2}>
                    {quiz.options.map((option, optionIndex) => (
                      <Text key={optionIndex} color={option === quiz.correctAnswer ? "green.500" : "inherit"}>
                        {optionIndex + 1}. {option} {option === quiz.correctAnswer && "(Correct)"}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onViewQuizClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <LessonModal
        isOpen={isViewLessonOpen}
        onClose={onViewLessonClose}
        lessonData={viewLessonData}
      />

      <AddLessonModal
        isOpen={isAddLessonModalOpen}
        onClose={handleCloseAddLessonModal}
        courseId={course?.id}
        onLessonAdded={handleLessonAdded}
      />
    </Container>
  );
};

export default ViewEditCourse;