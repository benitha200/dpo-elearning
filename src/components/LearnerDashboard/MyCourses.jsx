// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import DOMPurify from 'dompurify';
// import {
//   ChakraProvider,
//   Box,
//   Heading,
//   SimpleGrid,
//   Text,
//   Button,
//   VStack,
//   useToast,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Image
// } from '@chakra-ui/react';
// import { Spinner } from '@chakra-ui/spinner';
// import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/alert';
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card';
// import { FaBook, FaDollarSign, FaUser, FaCalendar } from 'react-icons/fa';
// import API_URL from '../../Constants/Const';
// import defaultImage from './../../assets/img/1.jpg';

// const MyCourses = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [allCourses, setAllCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [enrollingCourseId, setEnrollingCourseId] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const [allCoursesResponse, enrolledCoursesResponse] = await Promise.all([
//           axios.get(`${API_URL}/api/course/all`, {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Accept': 'application/json'
//             }
//           }),
//           axios.get(`${API_URL}/api/enroll/byUser`, {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Accept': 'application/json'
//             }
//           })
//         ]);

//         const enrolledCourseIds = new Set(enrolledCoursesResponse.data.data.map(enrollment => enrollment.courseId));
//         setEnrolledCourses(enrolledCoursesResponse.data.data);
//         setAllCourses(allCoursesResponse.data.data.filter(course => !enrolledCourseIds.has(course.id)));
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//         setError('Failed to fetch courses. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleEnrollCourse = async (courseId) => {
//     setEnrollingCourseId(courseId);
//     try {
//       const token = localStorage.getItem('token');
//       const phoneNumber = "0784381529"; 
//       const amount = 100; 
//       const response = await axios.post(`${API_URL}/api/pay/cashin/${courseId}`, {
//         phoneNumber,
//         amount,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.data.message === 'Payment initiated') {
//         toast({
//           title: "Payment Initiated",
//           description: "Please complete the payment process.",
//           status: "info",
//           duration: 5000,
//           isClosable: true,
//         });
//       } else if (response.data.message === 'Payment successful, user enrolled to this course') {
//         toast({
//           title: "Enrollment Successful",
//           description: "You have been enrolled in the course!",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });
//         const enrolledCourse = allCourses.find(course => course.id === courseId);
//         const newEnrollment = {
//           id: Date.now().toString(),
//           courseId: courseId,
//           enrollmentDate: new Date().toISOString(),
//           course: {
//             id: courseId,
//             title: enrolledCourse.title,
//             description: enrolledCourse.description,
//             imageUrl: enrolledCourse.imageUrl
//           }
//         };
//         setEnrolledCourses(prevEnrolledCourses => [...prevEnrolledCourses, newEnrollment]);
//         setAllCourses(prevAllCourses => prevAllCourses.filter(course => course.id !== courseId));
//       }
//     } catch (err) {
//       console.error('Enrollment failed:', err);
//       toast({
//         title: "Enrollment Failed",
//         description: err.response?.data?.error || "Failed to enroll in the course. Please try again later.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setEnrollingCourseId(null);
//     }
//   };

//   const truncateDescription = (description, maxLength = 100) => {
//     const sanitizedDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });
//     if (sanitizedDescription.length <= maxLength) return sanitizedDescription;
//     return sanitizedDescription.slice(0, maxLength) + '...';
//   };

//   const EnrolledCourseCard = ({ enrollment }) => (
//     <Card key={enrollment.id} height="500px" overflow="hidden">
//       <CardHeader>
//         <Heading size="md" display="flex" alignItems="center">
//           <Box as={FaBook} marginRight={2} />
//           {enrollment.course.title}
//         </Heading>
//       </CardHeader>
//       <CardBody overflow="auto">
//         {enrollment.course.imageUrl && (
//           <Image src={enrollment.course.imageUrl} alt={enrollment.course.title} borderRadius="md" mb={4} />
//         )}
//         <Text>{truncateDescription(enrollment.course.description)}</Text>
//         <VStack align="start" spacing={2} mt={4}>
//           <Text display="flex" alignItems="center">
//             <Box as={FaCalendar} marginRight={2} />
//             Enrolled on: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
//           </Text>
//         </VStack>
//       </CardBody>
//       <CardFooter>
//         <Button
//           colorScheme="green"
//           onClick={() => navigate(`/course/${enrollment.courseId}`)}
//           width="100%"
//         >
//           Go to Course
//         </Button>
//       </CardFooter>
//     </Card>
//   );
//   const AvailableCourseCard = ({ course }) => (
//     <Card key={course.id} height="500px" overflow="hidden">
//       <CardHeader>
//         <Heading size="md" display="flex" alignItems="center">
//           <Box as={FaBook} marginRight={2} />
//           {course.title}
//         </Heading>
//       </CardHeader>
//       <CardBody overflow="auto">
//         {course.imageUrl && (
//           <Image src={course.imageUrl} alt={course.title} borderRadius="md" mb={4} />
//         )}
//         <Text>{truncateDescription(course.description)}</Text>
//         <VStack align="start" spacing={2} mt={4}>
//           <Text display="flex" alignItems="center">
//             <Box as={FaDollarSign} marginRight={2} />
//             Price: ${course.price}
//           </Text>
//           <Text display="flex" alignItems="center">
//             <Box as={FaUser} marginRight={2} />
//             Instructor: {course.user.firstName} {course.user.lastName}
//           </Text>
//         </VStack>
//       </CardBody>
//       <CardFooter>
//         <Button
//           colorScheme="blue"
//           onClick={() => handleEnrollCourse(course.id)}
//           isLoading={enrollingCourseId === course.id}
//           loadingText="Enrolling"
//           width="100%"
//         >
//           Enroll in Course
//         </Button>
//       </CardFooter>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert status="error">
//         <AlertIcon />
//         <AlertTitle mr={2}>Error</AlertTitle>
//         <AlertDescription>{error}</AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <ChakraProvider>
//       <Box maxWidth="1200px" margin="auto" padding={8}>
//         <Heading as="h1" size="2xl" marginBottom={8}>My Courses</Heading>
//         <Tabs>
//           <TabList>
//             <Tab>Enrolled Courses</Tab>
//             <Tab>Available Courses</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//                 {enrolledCourses.map((enrollment) => (
//                   <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
//                 ))}
//               </SimpleGrid>
//               {enrolledCourses.length === 0 && (
//                 <Text>You are not enrolled in any courses yet.</Text>
//               )}
//             </TabPanel>
//             <TabPanel>
//               <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//                 {allCourses.map((course) => (
//                   <AvailableCourseCard key={course.id} course={course} />
//                 ))}
//               </SimpleGrid>
//               {allCourses.length === 0 && (
//                 <Text>No additional courses available at the moment.</Text>
//               )}
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default MyCourses;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import {
  ChakraProvider,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
  VStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Flex,
  Badge,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/alert';
import { FaBook, FaDollarSign, FaUser, FaCalendar, FaClock } from 'react-icons/fa';
import API_URL from '../../Constants/Const';

const MyCourses = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const [allCoursesResponse, enrolledCoursesResponse] = await Promise.all([
          axios.get(`${API_URL}/api/course/all`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          }),
          axios.get(`${API_URL}/api/enroll/byUser`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
        ]);

        const enrolledCourseIds = new Set(enrolledCoursesResponse.data.data.map(enrollment => enrollment.courseId));
        setEnrolledCourses(enrolledCoursesResponse.data.data);
        setAllCourses(allCoursesResponse.data.data.filter(course => !enrolledCourseIds.has(course.id)));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnrollCourse = async (courseId) => {
    setEnrollingCourseId(courseId);
    try {
      const token = localStorage.getItem('token');
      const phoneNumber = "0784381529"; 
      const amount = 100; 
      const response = await axios.post(`${API_URL}/api/pay/cashin/${courseId}`, {
        phoneNumber,
        amount,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.message === 'Payment initiated') {
        toast({
          title: "Payment Initiated",
          description: "Please complete the payment process.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.data.message === 'Payment successful, user enrolled to this course') {
        toast({
          title: "Enrollment Successful",
          description: "You have been enrolled in the course!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        const enrolledCourse = allCourses.find(course => course.id === courseId);
        const newEnrollment = {
          id: Date.now().toString(),
          courseId: courseId,
          enrollmentDate: new Date().toISOString(),
          course: {
            id: courseId,
            title: enrolledCourse.title,
            description: enrolledCourse.description,
            imageUrl: enrolledCourse.imageUrl
          }
        };
        setEnrolledCourses(prevEnrolledCourses => [...prevEnrolledCourses, newEnrollment]);
        setAllCourses(prevAllCourses => prevAllCourses.filter(course => course.id !== courseId));
      }
    } catch (err) {
      console.error('Enrollment failed:', err);
      toast({
        title: "Enrollment Failed",
        description: err.response?.data?.error || "Failed to enroll in the course. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const truncateDescription = (description, maxLength = 100) => {
    const sanitizedDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });
    if (sanitizedDescription.length <= maxLength) return sanitizedDescription;
    return sanitizedDescription.slice(0, maxLength) + '...';
  };

  const EnrolledCourseCard = ({ enrollment }) => (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Image
        src={enrollment.course.imageUrl || "/api/placeholder/400/250"}
        alt={enrollment.course.title}
        objectFit="cover"
        height="200px"
        width="100%"
      />
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading size="md" noOfLines={1}>{enrollment.course.title}</Heading>
          <Badge colorScheme="green">Enrolled</Badge>
        </Flex>
        <Text color={textColor} mb={4} noOfLines={3}>
          {truncateDescription(enrollment.course.description)}
        </Text>
        <Divider my={4} />
        <Flex justify="space-between" align="center" color={textColor} fontSize="sm">
          <Flex align="center">
            <FaCalendar />
            <Text ml={2}>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</Text>
          </Flex>
          <Flex align="center">
            <FaClock />
            <Text ml={2}>Progress: 0%</Text>
          </Flex>
        </Flex>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={() => navigate(`/course/${enrollment.courseId}`)}
          width="100%"
        >
          Continue Learning
        </Button>
      </Box>
    </Box>
  );

  const AvailableCourseCard = ({ course }) => (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Image
        src={course.imageUrl || "/api/placeholder/400/250"}
        alt={course.title}
        objectFit="cover"
        height="200px"
        width="100%"
      />
      <Box p={6}>
        <Heading size="md" mb={2} noOfLines={1}>{course.title}</Heading>
        <Text color={textColor} mb={4} noOfLines={3}>
          {truncateDescription(course.description)}
        </Text>
        <Divider my={4} />
        <Flex justify="space-between" align="center" color={textColor} fontSize="sm">
          <Flex align="center">
            <FaDollarSign />
            <Text ml={2}>${course.price}</Text>
          </Flex>
          <Flex align="center">
            <FaUser />
            <Text ml={2}>{course.user.firstName} {course.user.lastName}</Text>
          </Flex>
        </Flex>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={() => handleEnrollCourse(course.id)}
          isLoading={enrollingCourseId === course.id}
          loadingText="Enrolling"
          width="100%"
        >
          Enroll Now
        </Button>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg={bgColor} py={8}>
        <Box maxWidth="1200px" margin="auto" padding={8}>
          <Heading as="h1" size="2xl" mb={8} textAlign="center">My Learning Journey</Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Enrolled Courses</Tab>
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Available Courses</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                  {enrolledCourses.map((enrollment) => (
                    <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
                  ))}
                </SimpleGrid>
                {enrolledCourses.length === 0 && (
                  <Text textAlign="center" fontSize="lg" mt={8}>You are not enrolled in any courses yet.</Text>
                )}
              </TabPanel>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                  {allCourses.map((course) => (
                    <AvailableCourseCard key={course.id} course={course} />
                  ))}
                </SimpleGrid>
                {allCourses.length === 0 && (
                  <Text textAlign="center" fontSize="lg" mt={8}>No additional courses available at the moment.</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default MyCourses;