import React, { useState, useEffect } from 'react';
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
  Flex,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../Constants/Const';

const CourseAssessments = ({ course }) => {
  const [assessments, setAssessments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState(null);
  const cancelRef = React.useRef();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, [course.id]);

  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/assessment/course/${course.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch assessments');
      }
      const result = await response.json();
      setAssessments(result.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: "Error fetching assessments",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleView = (assessmentId) => {
    navigate(`/assignment/${course.id}/${assessmentId}`);
  };

  const handleEdit = (assessmentId) => {
    navigate(`/assignment/edit/${assessmentId}`);
  };

  const openDeleteConfirmation = (assessment) => {
    setAssessmentToDelete(assessment);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (assessmentToDelete) {
      try {
        await fetch(`${API_URL}/api/assessment/delete/${assessmentToDelete.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setAssessments(assessments.filter(assessment => assessment.id !== assessmentToDelete.id));
        toast({
          title: "Assessment deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting assessment:', error);
        toast({
          title: "Error deleting assessment",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>{course.title}</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Created At</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assessments.map((assessment) => (
            <Tr key={assessment.id} _hover={{ bg: "gray.50" }}>
              <Td>{assessment.question}</Td>
              <Td>{new Date(assessment.createdAt).toLocaleDateString()}</Td>
              <Td>
                <Flex>
                  <Button
                    leftIcon={<FiEye />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => handleView(assessment.id)}
                    mr={2}
                  >
                    View
                  </Button>
                  <Button
                    leftIcon={<FiEdit />}
                    size="sm"
                    variant="ghost"
                    colorScheme="green"
                    onClick={() => handleEdit(assessment.id)}
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<FiTrash2 />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => openDeleteConfirmation(assessment)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Assessment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CourseAssessments;