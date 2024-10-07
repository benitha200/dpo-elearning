// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Box, Heading, Text, Button, VStack, HStack, useToast, Input, Select } from '@chakra-ui/react';
// import { Edit, Plus, Save, X } from 'lucide-react';

// const API_URL = 'http://localhost:4000'; // Replace with your actual API URL

// const ViewCourseAssignment = () => {
//   const [assessments, setAssessments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const toast = useToast();

//   useEffect(() => {
//     fetchAssessments();
//   }, [courseId]);

//   const fetchAssessments = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/assessment/course/${courseId}`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Accept': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setAssessments(data.data);
//       } else {
//         setAssessments([]);
//       }
//     } catch (err) {
//       setAssessments([]);
//       toast({
//         title: "Error fetching assessments",
//         description: "Unable to load assessments. Please try again later.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddAssignment = () => {
//     navigate(`/assignment/new/${courseId}`);
//   };

//   const handleEditAssignment = (assessmentId) => {
//     setEditingId(assessmentId);
//   };

//   const handleSaveEdit = async (assessment) => {
//     try {
//       const response = await fetch(`${API_URL}/api/assessment/update/${assessment.id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           question: assessment.question,
//           options: assessment.options.join(','), // Convert array to comma-separated string
//           correctAnswer: assessment.correctAnswer
//         })
//       });

//       if (response.ok) {
//         toast({
//           title: "Assessment updated",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//         setEditingId(null);
//         fetchAssessments();
//       } else {
//         throw new Error('Failed to update assessment');
//       }
//     } catch (err) {
//       toast({
//         title: "Error updating assessment",
//         description: "Unable to save changes. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   if (loading) {
//     return <Text>Loading assessments...</Text>;
//   }

//   return (
//     <Box p={5}>
//       <Heading mb={5}>Course Assessment</Heading>
//       {assessments.length > 0 ? (
//         <VStack align="stretch" spacing={4}>
//           {assessments.map((assessment) => (
//             <Box key={assessment.id} p={4} borderWidth={1} borderRadius="md">
//               {editingId === assessment.id ? (
//                 <EditableAssessment
//                   assessment={assessment}
//                   onSave={handleSaveEdit}
//                   onCancel={handleCancelEdit}
//                 />
//               ) : (
//                 <HStack justify="space-between">
//                   <VStack align="start" spacing={2}>
//                     <Text fontWeight="bold">{assessment.question}</Text>
//                     <Text>Options:</Text>
//                     {assessment.options.map((option, index) => (
//                       <Text key={index} pl={4}>• {option}</Text>
//                     ))}
//                     <Text>Correct Answer: {assessment.correctAnswer}</Text>
//                   </VStack>
//                   <Button leftIcon={<Edit />} onClick={() => handleEditAssignment(assessment.id)}>
//                     Edit
//                   </Button>
//                 </HStack>
//               )}
//             </Box>
//           ))}
//         </VStack>
//       ) : (
//         <Box textAlign="center" py={10}>
//           <Text mb={4}>No assessments found for this course.</Text>
//           <Button leftIcon={<Plus />} colorScheme="blue" onClick={handleAddAssignment}>
//             Add New Assignment
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// const EditableAssessment = ({ assessment, onSave, onCancel }) => {
//   const [editedAssessment, setEditedAssessment] = useState({ ...assessment });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedAssessment(prev => ({ ...prev, [name]: value }));
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...editedAssessment.options];
//     newOptions[index] = value;
//     setEditedAssessment(prev => ({ ...prev, options: newOptions }));
//   };

//   return (
//     <VStack align="stretch" spacing={3}>
//       <Input
//         name="question"
//         value={editedAssessment.question}
//         onChange={handleChange}
//         placeholder="Question"
//       />
//       {editedAssessment.options.map((option, index) => (
//         <Input
//           key={index}
//           value={option}
//           onChange={(e) => handleOptionChange(index, e.target.value)}
//           placeholder={`Option ${index + 1}`}
//         />
//       ))}
//       <Select
//         name="correctAnswer"
//         value={editedAssessment.correctAnswer}
//         onChange={handleChange}
//       >
//         {editedAssessment.options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </Select>
//       <HStack>
//         <Button leftIcon={<Save />} onClick={() => onSave(editedAssessment)}>Save</Button>
//         <Button leftIcon={<X />} onClick={onCancel}>Cancel</Button>
//       </HStack>
//     </VStack>
//   );
// };

// export default ViewCourseAssignment;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    options: '',
    correctAnswer: '',
    courseId: courseId || '',
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

      // Navigate back to the course assignment page
      navigate(`/course/${formData.courseId}/assignments`);
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
            isDisabled={!!courseId}
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