// import React from 'react';
// import { Box, Heading, VStack, Container, Divider, useColorModeValue } from "@chakra-ui/react";
// import CourseForm from './CourseForm';

// const ViewEditCourse = ({ course, onSubmit, onCancel }) => {
//   const bgColor = useColorModeValue('gray.50', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   return (
//     <Container maxW="container.xl" py={8}>
//       <VStack
//         spacing={6}
//         align="stretch"
//         bg={bgColor}
//         borderRadius="xl"
//         boxShadow="lg"
//         p={8}
//         borderWidth={1}
//         borderColor={borderColor}
//       >
//         <Box textAlign="center">
//           <Heading as="h2" size="xl" mb={2}>
//             {course ? 'Edit Course' : 'Add New Course'}
//           </Heading>
//           <Divider my={4} borderColor={borderColor} />
//         </Box>
        
//         <Box>
//           <CourseForm 
//             course={course} 
//             onSubmit={onSubmit} 
//             onCancel={onCancel} 
//           />
//         </Box>
//       </VStack>
//     </Container>
//   );
// };

// export default ViewEditCourse;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import CourseForm from './CourseForm';
import API_URL from '../../../Constants/Const';

const ViewEditCourse = ({ course, onSubmit, onCancel }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

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
        console.error('Received non-array data:', response.data);
        setError('Received invalid data format from the server');
        setLessons([]);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setError('Error fetching lessons. Please try again later.');
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    onOpen();
  };

  const handleSaveEdit = async (editedLesson) => {
    // Implement the logic to save the edited lesson
    // For now, we'll just close the modal
    onClose();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack
        spacing={6}
        align="stretch"
        bg={bgColor}
        borderRadius="xl"
        boxShadow="lg"
        p={8}
        borderWidth={1}
        borderColor={borderColor}
      >
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={2}>
            {course ? 'Edit Course' : 'Add New Course'}
          </Heading>
          <Divider my={4} borderColor={borderColor} />
        </Box>
        
        <Box>
          <CourseForm
            course={course}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </Box>

        {course && (
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Course Lessons
            </Heading>
            <Button className='bg-emerald-600'>
              Add Lesson
            </Button>
            {loading ? (
              <Spinner />
            ) : error ? (
              <Box color="red.500">{error}</Box>
            ) : (
              <Table variant="simple">
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
                    <Tr key={lesson.id}>
                      <Td>{lesson.title}</Td>
                      <Td>{lesson.content.substring(0, 50)}...</Td>
                      <Td>{lesson.videoUrl ? 'Available' : 'Not available'}</Td>
                      <Td>{lesson.subLessons?.length || 0}</Td>
                      <Td>{lesson.quizzes?.length || 0}</Td>
                      <Td>
                        <Tooltip label="Edit Lesson">
                          <IconButton
                            icon={<EditIcon />}
                            onClick={() => handleEditLesson(lesson)}
                            aria-label="Edit Lesson"
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Lesson</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add form fields for editing lesson here */}
            {/* For brevity, I'm not including the full form */}
            <p>Editing: {selectedLesson?.title}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSaveEdit(selectedLesson)}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ViewEditCourse;