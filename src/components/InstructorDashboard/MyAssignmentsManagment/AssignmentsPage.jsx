import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import API_URL from '../../../Constants/Const';
import CourseAssessments from './CourseAssessments';

const AssessmentsPage = () => {
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/course/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const result = await response.json();
      setCourses(result.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error fetching courses",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Assessments by Course</Heading>
      <Button
        leftIcon={<FiPlus />}
        colorScheme="blue"
        onClick={() => navigate('/assignment/new')}
        mb={6}
      >
        Add New Assessment
      </Button>
      <VStack spacing={8} align="stretch">
        {courses.map((course) => (
          <CourseAssessments key={course.id} course={course} />
        ))}
      </VStack>
    </Box>
  );
};

export default AssessmentsPage;