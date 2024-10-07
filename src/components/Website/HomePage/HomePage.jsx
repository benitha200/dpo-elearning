// // import React from 'react'
// // import Navbar from '../NavBar/NavBar';
// // import people from './../../../assets/img/1.jpg'
// // import { useState } from 'react';
// // import img1 from '../../../assets/img/24.jpg';
// // import img12 from '../../../assets/img/12.jpg';



// // const HomePage = () => {

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="d-flex" style={{ display: 'flex', width: '100%', marginTop: '5rem' }}>
// //         <div style={{ flex: '1 0 50%', display: 'flex', flexDirection: 'column', paddingLeft: '2%', paddingRight: '2%' }}>
// //           <span className='text-6xl text-left font-bold'>
// //             Make Skills Your <span className='text-6xl text-left font-bold text-blue-500'>Competitive</span> Advantage
// //           </span>
// //           <div className='mt-5 text-2xl' style={{ marginTop: '3rem' }}>
// //             <ul className='list-disc text-left'>
// //               <li className='mb-2'>Learn data protection from the experts</li>
// //               <li className='mb-2'>Gain valuable skills and certifications</li>
// //               <li className='mb-2'>Build your career in data security and privacy</li>
// //               <li className='mb-2'>Join thousands of learners</li>
// //             </ul>
// //           </div>
// //         </div>

// //         <img src={people} alt="People" className='w-1/2' style={{ flex: '1 0 50%', objectFit: 'cover' }} />
// //       </div>
// //       {/* search */}
// //       <div className='w-full bg-blue-500' style={{ width: '100vw', height: 'fit-content', marginLeft: 'calc(-50vw + 50%)', marginTop: '2rem',paddingTop:'3rem',paddingBottom:'2rem', marginRight: 'calc(-50vw + 50%)' }}>
// //         <span className='text-white text-4xl font-bold mt-5'>What Do You Want to Learn To day?</span>
// //         <div className="max-w-2xl mx-auto px-4 mt-5">
// //           <form>
// //             <label
// //               htmlFor="default-search"
// //               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
// //             >
// //               Search
// //             </label>
// //             <div className="relative">
// //               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
// //                 <svg
// //                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
// //                   aria-hidden="true"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   viewBox="0 0 20 20"
// //                 >
// //                   <path
// //                     stroke="currentColor"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
// //                   />
// //                 </svg>
// //               </div>
// //               <input
// //                 type="search"
// //                 id="default-search"
// //                 className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                 placeholder="Search any course you want to learn ..."
// //                 required
// //               />
// //               <button
// //                 type="submit"
// //                 className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
// //               >
// //                 Search
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Courses Section */}
// //       <span className='text-5xl m-4 p-5 font-bold'>Top Rated Courses</span>
// //       <div class="mt-5 gap-5 flex flex-row columns-3">
// //         <div className="  basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
// //           <a href="#">
// //             <img className="rounded-lg" src={img1} alt="" />
// //           </a>
// //           <div className="p-5">
// //             <a href="#">
// //               <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
// //             </a>
// //             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
// //             <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500">
// //               Enroll Now
// //               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
// //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
// //               </svg>
// //             </a>
// //           </div>
// //         </div>
// //         <div className=" basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
// //           <a href="#">
// //             <img className="rounded-lg" src={img1} alt="" />
// //           </a>
// //           <div className="p-5">
// //             <a href="#">
// //               <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
// //             </a>
// //             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
// //             <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500">
// //               Enroll Now
// //               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
// //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
// //               </svg>
// //             </a>
// //           </div>
// //         </div>
// //         <div className=" basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
// //           <a href="#">
// //             <img className="rounded-lg" src={img1} alt="" />
// //           </a>
// //           <div className="p-5">
// //             <a href="#">
// //               <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
// //             </a>
// //             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
// //             <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500">
// //               Enroll Now
// //               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
// //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
// //               </svg>
// //             </a>
// //           </div>
// //         </div>
// //         <div className=" basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
// //           <a href="#">
// //             <img className="rounded-lg" src={img1} alt="" />
// //           </a>
// //           <div className="p-5">
// //             <a href="#">
// //               <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
// //             </a>
// //             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
// //             <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500">
// //               Enroll Now
// //               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
// //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
// //               </svg>
// //             </a>
// //           </div>
// //         </div>
// //       </div>



// //     </>
// //   );
// // };

// // export default HomePage;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import DOMPurify from 'dompurify';
// import { SearchIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';
// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Heading,
//   Image,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   SimpleGrid,
//   Stack,
//   Text,
//   VStack,
//   HStack,
//   useColorModeValue,
//   Link,
//   Icon,
//   Avatar,
//   Wrap,
//   WrapItem,
// } from '@chakra-ui/react';
// import { FaGraduationCap, FaBook, FaUsers, FaCertificate } from 'react-icons/fa';
// import API_URL from '../../../Constants/Const';
// import img1 from './../../../assets/img/1.jpg'

// const HomePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const heroRef = useRef(null);
//   const coursesRef = useRef(null);
//   const featuresRef = useRef(null);
//   const testimonialsRef = useRef(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${API_URL}/api/course/all`);
//       if (Array.isArray(response.data.data)) {
//         setCourses(response.data.data.slice(0, 6)); // Limit to 6 courses
//       } else {
//         console.error('Received non-array data:', response.data);
//         setError('Received invalid data format from the server');
//         setCourses([]);
//       }
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setError('Error fetching courses. Please try again later.');
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const scrollToSection = (ref) => {
//     ref.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   const bgColor = useColorModeValue('gray.50', 'gray.800');
//   const cardBg = useColorModeValue('white', 'gray.700');

//   return (
//     <Box minH="100vh" bg={bgColor}>
//       {/* Navigation Bar */}
//       <Box as="nav" bg="white" boxShadow="sm" position="sticky" top="0" zIndex="sticky">
//         <Container maxW="container.xl">
//           <Flex h={16} alignItems="center" justifyContent="space-between">
//             <Heading size="md" color="blue.600">Data Security Hub</Heading>
//             <HStack spacing={8}>
//               <Link onClick={() => scrollToSection(heroRef)}>Home</Link>
//               <Link onClick={() => scrollToSection(coursesRef)}>Courses</Link>
//               <Link onClick={() => scrollToSection(featuresRef)}>Features</Link>
//               <Link onClick={() => scrollToSection(testimonialsRef)}>Testimonials</Link>
//             </HStack>
//             <Button colorScheme="blue"><a href='/login' className='hover:text-teal-50'>Login</a> </Button>
//           </Flex>
//         </Container>
//       </Box>

//       {/* Hero Section */}
//       <Box as="section" bg="white" py={20} ref={heroRef}>
//         <Container maxW="container.xl">
//           <Flex direction={{ base: 'column', md: 'row' }} align="center">
//             <Box flex={1} pr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
//               <Heading as="h1" size="2xl" mb={6}>
//                 Make Skills Your <Text as="span" color="blue.600">Competitive</Text> Advantage
//               </Heading>
//               <VStack align="start" spacing={4} mb={8}>
//                 {['Learn from industry experts', 'Gain valuable skills and certifications', 'Build your career in tech', 'Join a community of learners'].map((item, index) => (
//                   <Flex key={index} align="center">
//                     <CheckIcon color="green.500" mr={2} />
//                     <Text fontSize="xl">{item}</Text>
//                   </Flex>
//                 ))}
//               </VStack>
//               <Button size="lg" colorScheme="blue">Get Started</Button>
//             </Box>
//             <Box flex={1}>
//               <Image src={img1} alt="Learning" borderRadius="lg" boxShadow="xl" />
//             </Box>
//           </Flex>
//         </Container>
//       </Box>

//       {/* Search Section */}
//       <Box as="section" bg="blue.600" py={16}>
//         <Container maxW="container.xl">
//           <Heading as="h2" size="xl" color="white" textAlign="center" mb={8}>
//             What Do You Want to Learn Today?
//           </Heading>
//           <Box maxW="2xl" mx="auto">
//             <InputGroup size="lg">
//               <InputLeftElement pointerEvents="none">
//                 <SearchIcon color="gray.300" />
//               </InputLeftElement>
//               <Input
//                 type="search"
//                 placeholder="Search any course you want to learn..."
//                 bg="white"
//                 borderRadius="full"
//               />
//               <InputRightElement width="4.5rem">
//                 <Button h="1.75rem" size="sm" colorScheme="blue">
//                   Search
//                 </Button>
//               </InputRightElement>
//             </InputGroup>
//           </Box>
//         </Container>
//       </Box>

//       {/* Courses Section */}
//       <Box as="section" py={20} ref={coursesRef}>
//         <Container maxW="container.xl">
//           <Heading as="h2" size="2xl" textAlign="center" mb={12}>
//             Top Rated Courses
//           </Heading>
//           {loading && <Text textAlign="center">Loading courses...</Text>}
//           {error && <Text textAlign="center" color="red.500">{error}</Text>}
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
//             {courses.map((course) => (
//               <Box key={course.id} bg={cardBg} borderRadius="lg" overflow="hidden" boxShadow="md">
//                 <Image
//                   src={course.imageUrl || "/api/placeholder/400/250"}
//                   alt={course.title}
//                   objectFit="cover"
//                   h="200px"
//                   w="100%"
//                 />
//                 <Stack p={6} spacing={3} height="200px">
//                   <Heading size="md">{course.title}</Heading>
//                   <Box
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(course.description)
//                     }}
//                     fontSize="sm"
//                     color="gray.600"
//                     overflow="hidden"
//                     textOverflow="ellipsis"
//                     sx={{
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: 'vertical',
//                     }}
//                   />
//                 </Stack>
//                 <Box p={6} borderTop="1px" borderColor="gray.200">
//                   <Button colorScheme="blue" width="100%">
//                     Enroll Now
//                   </Button>
//                 </Box>
//               </Box>
//             ))}
//           </SimpleGrid>
//           <Box textAlign="center" mt={12}>
//             <Button size="lg" colorScheme="blue">
//               View All Courses
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box as="section" bg="gray.100" py={20} ref={featuresRef}>
//         <Container maxW="container.xl">
//           <Heading as="h2" size="2xl" textAlign="center" mb={12}>
//             Why Choose Us
//           </Heading>
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
//             {[
//               { icon: FaGraduationCap, title: 'Expert Instructors', description: 'Learn from industry professionals' },
//               { icon: FaBook, title: 'Comprehensive Curriculum', description: 'In-depth courses covering latest technologies' },
//               { icon: FaUsers, title: 'Community Support', description: 'Join a network of learners and mentors' },
//               { icon: FaCertificate, title: 'Certifications', description: 'Earn recognized certifications' },
//             ].map((feature, index) => (
//               <VStack key={index} align="center" textAlign="center">
//                 <Icon as={feature.icon} w={10} h={10} color="blue.500" />
//                 <Heading size="md">{feature.title}</Heading>
//                 <Text>{feature.description}</Text>
//               </VStack>
//             ))}
//           </SimpleGrid>
//         </Container>
//       </Box>

//       {/* Testimonials Section */}
//       <Box as="section" py={20} ref={testimonialsRef}>
//         <Container maxW="container.xl">
//           <Heading as="h2" size="2xl" textAlign="center" mb={12}>
//             What Our Students Say
//           </Heading>
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
//             {[
//               { name: 'M. Anitha Sandrine', role: 'Software Developer', content: 'The courses here have been instrumental in advancing my career. The instructors are top-notch!' },
//               { name: 'Shema Christian', role: 'Data Scientist', content: 'I love the hands-on projects. They really helped me apply what I learned in real-world scenarios.' },
//               { name: 'M. Rosine', role: 'UX Designer', content: 'The community support is amazing. I always get help when Im stuck on a problem.' },
//             ].map((testimonial, index) => (
//               <Box key={index} bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
//                 <VStack spacing={4} align="start">
//                   <HStack>
//                     <Avatar name={testimonial.name} src={`/api/placeholder/100/100?text=${testimonial.name.charAt(0)}`} />
//                     <Box>
//                       <Heading size="sm">{testimonial.name}</Heading>
//                       <Text fontSize="sm" color="gray.500">{testimonial.role}</Text>
//                     </Box>
//                   </HStack>
//                   <Text>{testimonial.content}</Text>
//                   <HStack color="yellow.400">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon key={i} />
//                     ))}
//                   </HStack>
//                 </VStack>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Container>
//       </Box>

//       {/* Call to Action */}
//       <Box as="section" bg="blue.600" py={20}>
//         <Container maxW="container.xl" textAlign="center">
//           <Heading as="h2" size="2xl" color="white" mb={6}>
//             Ready to Start Your Learning Journey?
//           </Heading>
//           <Button size="lg" colorScheme="white" className='bg-white '>
//             <a href='/register' className='text-sky-950'>Sign Up Now</a>
//           </Button>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box as="footer" bg="gray.800" color="white" py={10}>
//         <Container maxW="container.xl">
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
//             <VStack align="start">
//               <Heading size="md" mb={4}>Data Security Hub</Heading>
//               <Text>Empowering learners worldwide</Text>
//             </VStack>
//             <VStack align="start">
//               <Heading size="md" mb={4}>Quick Links</Heading>
//               <Link>About Us</Link>
//               <Link>Courses</Link>
//               <Link>Blog</Link>
//               <Link>Contact</Link>
//             </VStack>
//             <VStack align="start">
//               <Heading size="md" mb={4}>Support</Heading>
//               <Link>Help Center</Link>
//               <Link>Terms of Service</Link>
//               <Link>Privacy Policy</Link>
//             </VStack>
//             <VStack align="start">
//               <Heading size="md" mb={4}>Connect With Us</Heading>
//               <HStack>
//                 <Link>Facebook</Link>
//                 <Link>Twitter</Link>
//                 <Link>LinkedIn</Link>
//               </HStack>
//             </VStack>
//           </SimpleGrid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { SearchIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Link,
  Icon,
  Badge,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { FaGraduationCap, FaBook, FaUsers, FaCertificate, FaChalkboardTeacher, FaClock, FaLaptopCode, FaShieldAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../Constants/Const';
import img1 from './../../../assets/img/1.jpg'

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllCourses, setShowAllCourses] = useState(false);
  const navigate = useNavigate();

  // Refs for scroll navigation
  const homeRef = useRef(null);
  const coursesRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedCourses(showAllCourses ? filtered : filtered.slice(0, 3));
  }, [searchTerm, courses, showAllCourses]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/course/all`);
      if (Array.isArray(response.data.data)) {
        setCourses(response.data.data);
        setDisplayedCourses(response.data.data.slice(0, 3));
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewAllCourses = () => {
    setShowAllCourses(true);
  };

  const handleEnrollNow = () => {
    navigate('/register');
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Navigation Bar */}
      <Box as="nav" bg="white" boxShadow="sm" position="sticky" top="0" zIndex="sticky">
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Heading size="md" color="blue.600">Data Security Hub</Heading>
            <HStack spacing={8}>
              <Link onClick={() => scrollToSection(homeRef)}>Home</Link>
              <Link onClick={() => scrollToSection(coursesRef)}>Courses</Link>
              <Link onClick={() => scrollToSection(featuresRef)}>Features</Link>
              <Link onClick={() => scrollToSection(testimonialsRef)}>Testimonials</Link>
            </HStack>
            <Button colorScheme="blue">
              <Link href='/login' color="white">Login</Link>
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box as="section" bg="blue.600" py={20} color="white" ref={homeRef}>
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', md: 'row' }} align="center">
            <Box flex={1} pr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
              <Heading as="h1" size="2xl" mb={6}>
                Elevate Your Skills in <Text as="span" color="yellow.300">Data Security</Text>
              </Heading>
              <VStack align="start" spacing={4} mb={8}>
                {['Learn from industry experts', 'Gain practical skills', 'Earn recognized certifications', 'Join a community of professionals'].map((item, index) => (
                  <Flex key={index} align="center">
                    <CheckIcon color="green.300" mr={2} />
                    <Text fontSize="xl">{item}</Text>
                  </Flex>
                ))}
              </VStack>
              <Button size="lg" colorScheme="yellow" onClick={() => scrollToSection(coursesRef)}>Explore Courses</Button>
            </Box>
            <Box flex={1}>
              <Image src={img1} alt="Data Security Learning" borderRadius="lg" boxShadow="xl" />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box as="section" bg="gray.100" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Stat>
              <StatNumber fontSize="4xl" fontWeight="bold" color="blue.600">10,000+</StatNumber>
              <StatLabel fontSize="xl">Students Enrolled</StatLabel>
              <StatHelpText>Join our growing community</StatHelpText>
            </Stat>
            <Stat>
              <StatNumber fontSize="4xl" fontWeight="bold" color="blue.600">50+</StatNumber>
              <StatLabel fontSize="xl">Expert Instructors</StatLabel>
              <StatHelpText>Learn from industry leaders</StatHelpText>
            </Stat>
            <Stat>
              <StatNumber fontSize="4xl" fontWeight="bold" color="blue.600">95%</StatNumber>
              <StatLabel fontSize="xl">Job Placement Rate</StatLabel>
              <StatHelpText>For certificate program graduates</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Container>
      </Box>

          {/* Search Section */}
          <Box as="section" bg="gray.100" py={16}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Discover Your Next Data Security Course
          </Heading>
          <Box maxW="2xl" mx="auto">
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search for courses, topics, or skills..."
                bg="white"
                borderRadius="full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Box>
        </Container>
      </Box>

      {/* Courses Section */}
      <Box as="section" py={20}>
        <Container maxW="container.xl">
          <Heading as="h2" size="2xl" textAlign="center" mb={12}>
            Top Rated Data Security Courses
          </Heading>
          {loading && <Text textAlign="center">Loading courses...</Text>}
          {error && <Text textAlign="center" color="red.500">{error}</Text>}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {displayedCourses.map((course) => (
              <Box key={course.id} bg={cardBg} borderRadius="lg" overflow="hidden" boxShadow="md" transition="all 0.3s" _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}>
                <Image
                  src={course.imageUrl || "/api/placeholder/400/250"}
                  alt={course.title}
                  objectFit="cover"
                  h="200px"
                  w="100%"
                />
                <Stack p={6} spacing={3}>
                  <Heading size="md" noOfLines={2}>{course.title}</Heading>
                  <HStack>
                    <Icon as={FaChalkboardTeacher} color="blue.500" />
                    <Text fontSize="sm" color="gray.500">{course.user.firstName} {course.user.lastName}</Text>
                  </HStack>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(course.description)
                    }}
                    fontSize="sm"
                    color="gray.600"
                    noOfLines={3}
                  />
                  <Divider />
                  <HStack justifyContent="space-between" alignItems="center">
                    <Badge colorScheme="green" fontSize="lg" fontWeight="bold" px={3} py={1}>
                      ${course.price}
                    </Badge>
                    <HStack>
                      <Icon as={FaClock} color="blue.500" />
                      <Text fontSize="sm" color="gray.500">8 weeks</Text>
                    </HStack>
                  </HStack>
                </Stack>
                <Box p={6} borderTop="1px" borderColor="gray.200">
                  <Button colorScheme="blue" width="100%" onClick={handleEnrollNow}>
                    Enroll Now
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          {!showAllCourses && (
            <Box textAlign="center" mt={12}>
              <Button size="lg" colorScheme="blue" onClick={handleViewAllCourses}>
                View All Courses
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Box as="section" bg="gray.100" py={20}>
        <Container maxW="container.xl">
          <Heading as="h2" size="2xl" textAlign="center" mb={12}>
            Why Choose Data Security Hub
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {[
              { icon: FaGraduationCap, title: 'Industry Expert Instructors', description: 'Learn from professionals with real-world experience' },
              { icon: FaBook, title: 'Comprehensive Curriculum', description: 'In-depth courses covering latest data security technologies' },
              { icon: FaUsers, title: 'Vibrant Learning Community', description: 'Connect with peers and mentors in the field' },
              { icon: FaCertificate, title: 'Recognized Certifications', description: 'Earn certificates valued by top employers' },
            ].map((feature, index) => (
              <VStack key={index} align="center" textAlign="center" bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Icon as={feature.icon} w={10} h={10} color="blue.500" />
                <Heading size="md">{feature.title}</Heading>
                <Text>{feature.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box as="section" bg="blue.600" py={20}>
        <Container maxW="container.xl" textAlign="center">
          <Heading as="h2" size="2xl" color="white" mb={6}>
            Ready to Secure Your Future in Data Security?
          </Heading>
          <Button size="lg" colorScheme="yellow">
            <Link href='/register' color="blue.900">Sign Up Now</Link>
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.800" color="white" py={10}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <VStack align="start">
              <Heading size="md" mb={4}>Data Security Hub</Heading>
              <Text>Empowering data security professionals worldwide</Text>
            </VStack>
            <VStack align="start">
              <Heading size="md" mb={4}>Quick Links</Heading>
              <Link>About Us</Link>
              <Link>Courses</Link>
              <Link>Blog</Link>
              <Link>Contact</Link>
            </VStack>
            <VStack align="start">
              <Heading size="md" mb={4}>Support</Heading>
              <Link>Help Center</Link>
              <Link>Terms of Service</Link>
              <Link>Privacy Policy</Link>
            </VStack>
            <VStack align="start">
              <Heading size="md" mb={4}>Connect With Us</Heading>
              <HStack>
                <Link>Facebook</Link>
                <Link>Twitter</Link>
                <Link>LinkedIn</Link>
              </HStack>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;