import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { SearchIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Box, Button, Container, Flex, Heading, Image, Input, InputGroup, InputLeftElement,
  SimpleGrid, Stack, Text, VStack, HStack, useColorModeValue, Link, Icon, Badge,
  Divider, Stat, StatLabel, StatNumber, StatHelpText, AspectRatio
} from '@chakra-ui/react';
import { FaGraduationCap, FaBook, FaUsers, FaCertificate, FaChalkboardTeacher, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../Constants/Const';
import img1 from './../../../assets/img/1.jpg';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllCourses, setShowAllCourses] = useState(false);
  const navigate = useNavigate();

  const homeRef = useRef(null);
  const coursesRef = useRef(null);
  const whyUsRef = useRef(null);
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
              <Link onClick={() => scrollToSection(whyUsRef)}>WhyUs</Link>
              {/* <Link onClick={() => scrollToSection(testimonialsRef)}>Testimonials</Link> */}
            </HStack>
            <Button colorScheme="blue">
              <Link style={{ color: 'white' }}><a
              href="/login"
              className="text-white hover:text-sky-700 transition duration-150"
            >
              Login
              </a>
            </Link>
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section with Video */}
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
            {/* <Box flex={1}> */}
            {/* <Image src={img1} alt="Data Security Learning" borderRadius="lg" boxShadow="xl" /> */}
            {/* <video
                controls
                autoPlay
                muted
                loop
                src="/src/assets/videos/1.mp4"
                poster={img1}
                style={{
                  borderRadius: '1rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                Your browser does not support the video tag.
              </video> */}

            <Box
              flex={1.5}
              w="100%"
              maxW={{ base: "100%", lg: "800px" }}
              order={{ base: 2, lg: 1 }}
            >
              <AspectRatio ratio={16 / 9}>
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  src="/src/assets/videos/1.mp4"
                  poster={img1}
                  style={{
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                >
                  Your browser does not support the video tag.
                </video>

              </AspectRatio>
            </Box>
            {/* </Box> */}
          </Flex>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box as="section" bg="gray.50" py={16}>
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

      {/* Features Section */}
      <Box as="section" bg="gray.100" py={20} ref={whyUsRef}>
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


      {/* About Us */}
      <Box as="section" bg="blue.600" py={20} color="white" ref={whyUsRef}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify="space-between"
            gap={10}
          >
            <Box
              flex={1.5}
              w="100%"
              maxW={{ base: "100%", lg: "800px" }}
              order={{ base: 2, lg: 1 }}
            >
              <AspectRatio ratio={16 / 9}>
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  src="/src/assets/videos/1.mp4"
                  poster={img1}
                  style={{
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                >
                  Your browser does not support the video tag.
                </video>

              </AspectRatio>
            </Box>
            <VStack
              flex={1}
              align={{ base: "center", lg: "flex-start" }}
              spacing={6}
              order={{ base: 1, lg: 2 }}
              textAlign={{ base: "center", lg: "left" }}
            >
              <Heading as="h1" size="2xl">
                About <Text as="span" color="yellow.300">Our courses</Text>
              </Heading>
              <VStack align={{ base: "center", lg: "flex-start" }} spacing={4}>
                {['Learn from industry experts', 'Gain practical skills', 'Earn recognized certifications', 'Join a community of professionals'].map((item, index) => (
                  <Flex key={index} align="center">
                    <CheckIcon color="green.300" mr={2} />
                    <Text fontSize="xl">{item}</Text>
                  </Flex>
                ))}
              </VStack>
              <Button size="lg" colorScheme="yellow" onClick={() => scrollToSection(coursesRef)}>
                Explore Courses
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* Search and Courses Section */}
      <Box as="section" py={20} ref={coursesRef}>
        <Container maxW="container.xl">
          <Heading as="h2" size="2xl" textAlign="center" mb={12}>
            Discover Your Next Data Security Course
          </Heading>
          <Box maxW="2xl" mx="auto" mb={12}>
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