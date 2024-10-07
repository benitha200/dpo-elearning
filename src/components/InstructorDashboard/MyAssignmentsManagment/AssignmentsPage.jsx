import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Flex,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import API_URL from '../../../Constants/Const';
import { Eye, Plus } from 'lucide-react';

const AssignmentsPage = () => {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const cancelRef = React.useRef();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/course/all`);
      const result = await response.json();
      setCourses(result.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error fetching courses",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddAssignment = (courseId) => {
    navigate(`/assignment/${courseId}`);
  };

  const handleView = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const openDeleteConfirmation = (course) => {
    setCourseToDelete(course);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (courseToDelete) {
      try {
        await fetch(`${API_URL}/api/course/delete/${courseToDelete.id}`, { method: 'DELETE',headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}});
        setCourses(courses.filter(course => course.id !== courseToDelete.id));
        toast({
          title: "Course deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting course:', error);
        toast({
          title: "Error deleting course",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Courses</Heading>
      <Flex justify="space-between" align="center" mb={6}>
        <Input placeholder="Search courses..." maxWidth="sm" />
        <Button colorScheme="blue" onClick={() => navigate('/assignment/new')}>Add New Course</Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple" bg={bg} borderWidth={1} borderColor={borderColor}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Instructor</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.title}</Td>
                <Td>{`${course.user.firstName} ${course.user.lastName}`}</Td>
                <Td>${course.price}</Td>
                <Td>
                  <Button className='bg-sky-100' size="sm" variant="ghost" mr={2} onClick={() => handleAddAssignment(course.id)}><Eye/>View Assignment</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the course "{courseToDelete?.title}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button mode="contained" colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AssignmentsPage;