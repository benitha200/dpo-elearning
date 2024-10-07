import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import CourseCard from './CourseCard';
import CreateCourse from './CreateCourse';
import ViewEditCourse from './ViewEditCourse';

const API_BASE_URL = 'http://localhost:4000/api';
const TOKEN = localStorage.getItem('token');

const MyCoursesAsInstructor = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'create', or 'edit'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/course/all`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      if (Array.isArray(response.data.data)) {
        setCourses(response.data.data);
      } else {
        console.error('Received non-array data:', response.data);
        setError('Received invalid data format from the server');
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses. Please try again later.');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData, id = null) => {
    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/course/update/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast({ title: 'Course updated successfully', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post(`${API_BASE_URL}/course/create`, formData, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast({ title: 'Course created successfully', status: 'success', duration: 3000, isClosable: true });
      }
      fetchCourses();
      setView('list');
    } catch (error) {
      console.error('Error creating/updating course:', error);
      toast({
        title: 'Error creating/updating course',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/course/delete/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}`,'Content-Type': 'multipart/form-data', }
      });
      toast({ title: 'Course deleted successfully', status: 'success', duration: 3000, isClosable: true });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: 'Error deleting course',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6}>
        <Heading as="h1" size="xl" mb={6}>My Courses</Heading>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      {view === 'list' && (
        <>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading as="h1" size="xl">My Courses</Heading>
            <Button colorScheme="blue" onClick={() => setView('create')}>
              Create New Course
            </Button>
          </Flex>
          {courses.length === 0 ? (
            <Text>No courses available. Create a new course to get started!</Text>
          ) : (
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onView={() => { setSelectedCourse(course); setView('edit'); }}
                  onDelete={handleDelete}
                />
              ))}
            </Grid>
          )}
        </>
      )}

      {view === 'create' && (
        <CreateCourse
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setView('list')}
        />
      )}

      {view === 'edit' && (
        <ViewEditCourse
          course={selectedCourse}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setView('list')}
        />
      )}
    </Box>
  );
};

export default MyCoursesAsInstructor;