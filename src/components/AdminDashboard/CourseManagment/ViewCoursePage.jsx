// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Heading,
//   Text,
//   VStack,
//   Button,
//   Image,
//   Grid,
//   useToast
// } from '@chakra-ui/react';
// import API_URL from '../../../Constants/Const';

// const ViewCoursePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     fetchCourse();
//   }, [id]);

//   const fetchCourse = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/course/single/${id}`);
//       const data = await response.json();
//       setCourse(data);
//     } catch (error) {
//       console.error('Error fetching course:', error);
//       toast({
//         title: "Error fetching course",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   if (!course) return <Text>Loading...</Text>;

//   return (
//     <Box maxWidth="800px" margin="auto" mt={8} p={6} boxShadow="lg" bg="white" borderRadius="md">
//       {/* Course Image */}
//       <Image 
//         src={course?.data?.imageUrl || 'https://via.placeholder.com/800x400'} // Fallback image in case course image is missing
//         alt={course.title}
//         borderRadius="md"
//         objectFit="cover"
//         width="100%"
//         height="400px"
//         mb={6}
//       />

//       {/* Course Title */}
//       <Heading mb={6} fontSize="2xl" textAlign="center">{course.title}</Heading>

//       {/* Course Details in Grid Layout */}
//       <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
//         <VStack align="start" spacing={4}>
//           <Text fontSize="lg"><strong>Instructor:</strong> {course?.data?.user?.firstName} {course?.data?.user?.lastName}</Text>
//           <Text fontSize="lg"><strong>Price:</strong> ${course?.data?.price}</Text>
//           <Text fontSize="lg"><strong>Description:</strong> {course?.data?.description}</Text>
//         </VStack>

//         <VStack align="start" spacing={4}>
//           <Text fontSize="lg"><strong>Category:</strong> {course?.data?.category || "Data Security"}</Text>
//           <Text fontSize="lg"><strong>Duration:</strong> {course?.data?.duration} hours</Text>
//           <Text fontSize="lg"><strong>Level:</strong> {course?.data?.level || "Advanced"}</Text>
//         </VStack>
//       </Grid>

//       {/* Back Button */}
//       <Box mt={8} textAlign="center">
//         <Button colorScheme="blue" onClick={() => navigate('/courses')}>
//           Back to Courses
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ViewCoursePage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  Grid,
  useToast
} from '@chakra-ui/react';
import DOMPurify from 'dompurify';
import API_URL from '../../../Constants/Const';

const ViewCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${API_URL}/api/course/single/${id}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Error fetching course",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!course) return <Text>Loading...</Text>;

  const sanitizedDescription = DOMPurify.sanitize(course?.data?.description || '');

  return (
    <Box maxWidth="800px" margin="auto" mt={8} p={6} boxShadow="lg" bg="white" borderRadius="md">
      {/* Course Image */}
      <Image
        src={course?.data?.imageUrl || 'https://via.placeholder.com/800x400'}
        alt={course.title}
        borderRadius="md"
        objectFit="cover"
        width="100%"
        height="400px"
        mb={6}
      />

      {/* Course Title */}
      <Heading mb={6} fontSize="2xl" textAlign="center">{course.title}</Heading>

      {/* Course Details in Grid Layout */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <VStack align="start" spacing={4}>
          <Text fontSize="lg"><strong>Instructor:</strong> {course?.data?.user?.firstName} {course?.data?.user?.lastName}</Text>
          <Text fontSize="lg"><strong>Price:</strong> ${course?.data?.price}</Text>
          <Text fontSize="lg"><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: sanitizedDescription }} /></Text>
        </VStack>

        <VStack align="start" spacing={4}>
          <Text fontSize="lg"><strong>Category:</strong> {course?.data?.category || "Data Security"}</Text>
          <Text fontSize="lg"><strong>Duration:</strong> {course?.data?.duration} hours</Text>
          <Text fontSize="lg"><strong>Level:</strong> {course?.data?.level || "Advanced"}</Text>
        </VStack>
      </Grid>

      {/* Back Button */}
      <Box mt={8} textAlign="center">
        <Button colorScheme="blue" onClick={() => navigate('/courses')}>
          Back to Courses
        </Button>
      </Box>
    </Box>
  );
};

export default ViewCoursePage;