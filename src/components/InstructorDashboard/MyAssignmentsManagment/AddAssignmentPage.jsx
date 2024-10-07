import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import API_URL from '../../../Constants/Const';

const AddAssignmentPage = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: '',
    correctAnswer: '',
    courseId: '',
  });
  const [courses, setCourses] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/course/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Error fetching courses',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/assessment/create/${formData.courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          question: formData.question,
          options: formData.options.split(',').map((opt) => opt.trim()),
          correctAnswer: formData.correctAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment');
      }

      toast({
        title: 'Assignment created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        question: '',
        options: '',
        correctAnswer: '',
        courseId: '',
      });
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast({
        title: 'Error creating assignment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Create New Assignment</Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Question</FormLabel>
          <Textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the assignment question"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Options (comma-separated)</FormLabel>
          <Input
            name="options"
            value={formData.options}
            onChange={handleChange}
            placeholder="Enter options separated by commas"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Correct Answer</FormLabel>
          <Input
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            placeholder="Enter the correct answer"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Course</FormLabel>
          <Select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            placeholder="Select course"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button colorScheme="blue" type="submit">Create Assignment</Button>
      </VStack>
    </Box>
  );
};

export default AddAssignmentPage;