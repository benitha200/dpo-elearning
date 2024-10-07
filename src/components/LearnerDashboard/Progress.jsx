// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const progressData = [
//   { name: 'Web Dev', completed: 75, total: 100 },
//   { name: 'Data Science', completed: 45, total: 100 },
//   { name: 'UX Design', completed: 60, total: 100 },
//   { name: 'Mobile Dev', completed: 30, total: 100 },
// ];

// const Progress = () => (
//   <div className="w-full min-h-screen bg-gray-100 p-6">
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">My Progress</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Completion Progress</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={progressData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="completed" name="Completed" fill="#4F46E5" />
//               <Bar dataKey="total" name="Total" fill="#E5E7EB" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="space-y-6">
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h2>
//             <div className="text-4xl font-bold text-blue-600">52.5%</div>
//             <p className="text-sm text-gray-600 mt-2">Average completion across all courses</p>
//           </div>
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Course</h2>
//             <div className="text-2xl font-semibold text-green-600">Web Development</div>
//             <p className="text-sm text-gray-600 mt-2">75% completed</p>
//           </div>
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Goal</h2>
//             <div className="text-lg font-medium text-purple-600">Complete Data Science Module 3</div>
//             <p className="text-sm text-gray-600 mt-2">Estimated time: 2 hours</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Progress;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Progress,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import API_URL from '../../Constants/Const';


const ProgressDashboard = () => {
  const [courseProgress, setCourseProgress] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/progress/course-progress`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourseProgress(data.data);

        const totalProgress = data.data.reduce((sum, course) => sum + course.progressPercentage, 0);
        setOverallProgress((totalProgress / data.data.length).toFixed(1));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <Heading as="h1" size="2xl" mb={8}>
          My Learning Progress
        </Heading>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          <Box gridColumn={{ lg: 'span 2' }} bg={cardBgColor} borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="lg" mb={4}>
              Course Completion Progress
            </Heading>
            <Box height="400px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="courseName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progressPercentage" name="Progress (%)" fill="#0284c7" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <VStack spacing={6}>
            <Box w="100%" bg={cardBgColor} borderRadius="lg" boxShadow="md" p={6}>
              <Heading as="h2" size="lg" mb={2}>
                Overall Progress
              </Heading>
              <Text fontSize="4xl" fontWeight="bold" color="blue.500">
                {overallProgress}%
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Average completion across all courses
              </Text>
              <Progress value={parseFloat(overallProgress)} colorScheme="blue" borderRadius="full" />
            </Box>
            {courseProgress.map((course, index) => (
              <Box key={index} w="100%" bg={cardBgColor} borderRadius="lg" boxShadow="md" p={6}>
                <Heading as="h3" size="md" mb={4}>
                  {course.courseName}
                </Heading>
                <HStack spacing={4} align="flex-start">
                  <Image
                    src={course.imageUrl}
                    alt={course.courseName}
                    boxSize="64px"
                    objectFit="cover"
                    borderRadius="full"
                  />
                  <VStack align="flex-start" flex={1}>
                    <Text fontSize="2xl" fontWeight="semibold" color="green.500">
                      {course.progressPercentage}%
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Completed
                    </Text>
                    <Progress
                      value={course.progressPercentage}
                      colorScheme="green"
                      w="100%"
                      borderRadius="full"
                    />
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const LoadingSkeleton = () => (
  <Box bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh" py={8}>
    <Container maxW="7xl">
      <Skeleton height="40px" width="250px" mb={8} />
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
        <Skeleton height="400px" gridColumn={{ lg: 'span 2' }} />
        <VStack spacing={6}>
          <Skeleton height="200px" width="100%" />
          <Skeleton height="200px" width="100%" />
          <Skeleton height="200px" width="100%" />
        </VStack>
      </SimpleGrid>
    </Container>
  </Box>
);

const ErrorAlert = ({ message }) => (
  <Alert status="error" borderRadius="md">
    <AlertIcon />
    <AlertTitle mr={2}>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default ProgressDashboard;