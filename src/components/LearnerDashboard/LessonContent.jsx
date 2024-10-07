// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, CheckCircle, PlayCircle, FileText, Download } from 'lucide-react';
// import {
//     Box,
//     Button,
//     VStack,
//     Heading,
//     Text,
//     Image,
//     Accordion,
//     AccordionItem,
//     AccordionButton,
//     AccordionPanel,
//     AccordionIcon,
//     List,
//     ListItem,
//     ListIcon,
//     Link,
//     Flex,
//     Spinner,
// } from '@chakra-ui/react';
// import { MdCheckCircle } from 'react-icons/md';

// const LessonContent = () => {
//     const { courseId, lessonId } = useParams();
//     const navigate = useNavigate();
//     const [lesson, setLesson] = useState(null);

//     useEffect(() => {
//         const fetchLesson = async () => {
//             const mockLesson = {
//                 id: lessonId,
//                 title: 'Introduction to HTML',
//                 type: 'video',
//                 content: 'In this lesson, we\'ll cover the basics of HTML, including its structure, common tags, and how to create your first web page.',
//                 videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
//                 duration: '45:30',
//                 nextLessonId: '2',
//                 sections: [
//                     {
//                         title: 'What is HTML?',
//                         content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.',
//                     },
//                     {
//                         title: 'Basic Structure of an HTML Document',
//                         content: 'An HTML document starts with a DOCTYPE declaration, followed by the <html> element, which contains the <head> and <body> elements.',
//                     },
//                     {
//                         title: 'Common HTML Tags',
//                         content: 'Some common HTML tags include <h1> to <h6> for headings, <p> for paragraphs, <a> for links, and <img> for images.',
//                     },
//                 ],
//                 quiz: [
//                     {
//                         question: 'What does HTML stand for?',
//                         options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
//                         correctAnswer: 0,
//                     },
//                     {
//                         question: 'Which tag is used to define an unordered list in HTML?',
//                         options: ['<ol>', '<li>', '<ul>', '<list>'],
//                         correctAnswer: 2,
//                     },
//                 ],
//                 resources: [
//                     { name: 'HTML Cheat Sheet', type: 'pdf', url: '#' },
//                     { name: 'Sample HTML Code', type: 'code', url: '#' },
//                 ],
//             };
//             setLesson(mockLesson);
//         };

//         fetchLesson();
//     }, [lessonId]);

//     if (!lesson) {
//         return (
//             <Flex justify="center" align="center" height="100vh">
//                 <Spinner size="xl" />
//             </Flex>
//         );
//     }

//     const getLessonIcon = (type) => {
//         switch (type) {
//             case 'video':
//                 return <PlayCircle />;
//             case 'reading':
//                 return <FileText />;
//             case 'exercise':
//                 return <Download />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box bg="gray.100" minHeight="100vh">
//             <Box maxWidth="4xl" mx="auto" px={4} py={8}>
//                 <Button
//                     leftIcon={<ArrowLeft />}
//                     onClick={() => navigate(`/course/${courseId}`)}
//                     colorScheme="blue"
//                     variant="ghost"
//                     mb={6}
//                 >
//                     Back to Course
//                 </Button>

//                 <Box bg="white" shadow="lg" rounded="lg" overflow="hidden">
//                     <Box p={6}>
//                         <Flex align="center" mb={4}>
//                             {getLessonIcon(lesson.type)}
//                             <Heading as="h1" size="xl" ml={2}>
//                                 {lesson.title}
//                             </Heading>
//                         </Flex>

//                         {lesson.type === 'video' && (
//                             <Box mb={6} position="relative" paddingTop="56.25%" height="0" overflow="hidden">
//                                 <iframe
//                                     src={lesson.videoUrl}
//                                     title={lesson.title}
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                     style={{
//                                         position: 'absolute',
//                                         top: 0,
//                                         left: 0,
//                                         width: '100%',
//                                         height: '100%',
//                                     }}
//                                 />
//                             </Box>
//                         )}


//                         <Text color="gray.600" mb={6}>
//                             {lesson.content}
//                         </Text>

//                         <Accordion allowMultiple mb={6}>
//                             {lesson.sections.map((section, index) => (
//                                 <AccordionItem key={index}>
//                                     <h2>
//                                         <AccordionButton>
//                                             <Box flex="1" textAlign="left">
//                                                 {section.title}
//                                             </Box>
//                                             <AccordionIcon />
//                                         </AccordionButton>
//                                     </h2>
//                                     <AccordionPanel pb={4}>
//                                         <Text color="gray.600">{section.content}</Text>
//                                     </AccordionPanel>
//                                 </AccordionItem>
//                             ))}
//                         </Accordion>

//                         <Heading as="h2" size="lg" mb={4}>
//                             Quiz
//                         </Heading>
//                         <VStack align="stretch" spacing={4} mb={6}>
//                             {lesson.quiz.map((question, index) => (
//                                 <Box key={index}>
//                                     <Text fontWeight="medium" mb={2}>
//                                         {question.question}
//                                     </Text>
//                                     <List spacing={1}>
//                                         {question.options.map((option, optionIndex) => (
//                                             <ListItem key={optionIndex}>
//                                                 <ListIcon as={MdCheckCircle} color="green.500" />
//                                                 {option}
//                                             </ListItem>
//                                         ))}
//                                     </List>
//                                 </Box>
//                             ))}
//                         </VStack>

//                         <Heading as="h2" size="lg" mb={4}>
//                             Additional Resources
//                         </Heading>
//                         <List spacing={2} mb={8}>
//                             {lesson.resources.map((resource, index) => (
//                                 <ListItem key={index}>
//                                     <Link color="blue.600" href={resource.url}>
//                                         {resource.name} ({resource.type})
//                                     </Link>
//                                 </ListItem>
//                             ))}
//                         </List>

//                         <Flex align="center" justify="space-between">
//                             <Text fontSize="sm" color="gray.500">
//                                 Duration: {lesson.duration}
//                             </Text>
//                             <Flex>
//                                 <Button colorScheme="blue" mr={4}>
//                                     Next Lesson
//                                 </Button>
//                                 <Button leftIcon={<CheckCircle />} variant="outline">
//                                     Mark as Complete
//                                 </Button>
//                             </Flex>
//                         </Flex>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default LessonContent;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ArrowLeft, ArrowRight, CheckCircle, Book } from 'lucide-react';
// import {
//     Box,
//     Button,
//     Heading,
//     Text,
//     Flex,
//     Spinner,
//     useToast,
//     Progress,
//     VStack,
//     HStack,
//     Badge,
// } from '@chakra-ui/react';
// import API_URL from '../../Constants/Const';

// const LessonContent = () => {
//     const { courseId, lessonId, subLessonId } = useParams();
//     const navigate = useNavigate();
//     const [course, setCourse] = useState(null);
//     const [currentLesson, setCurrentLesson] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [progress, setProgress] = useState(0);
//     const toast = useToast();

//     useEffect(() => {
//         const fetchCourseData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`${API_URL}/api/lesson/byCourse/${courseId}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Accept': 'application/json'
//                     }
//                 });

//                 console.log(response.data);

//                 if (response.data && response.data.data.length > 0) {
//                     const courseData = response.data.data[0]; 
//                     console.log(courseData);// Assuming the first item is the course we want
//                     setCourse(courseData);


//                     if (courseData.id === lessonId) {
//                         setCurrentLesson(courseData);
//                     } else if (subLessonId) {
//                         const subLesson = courseData.subLessons.find(sl => sl.id === subLessonId);
//                         setCurrentLesson(subLesson || courseData);
//                     } else {
//                         setCurrentLesson(courseData);
//                     }

//                     calculateProgress(courseData);
//                 } else {
//                     throw new Error('No course data found.');
//                 }
//             } catch (err) {
//                 console.error('Error fetching course:', err);
//                 setError('Failed to fetch course content. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourseData();
//     }, [courseId, lessonId, subLessonId]);

//     const calculateProgress = (courseData) => {
//         const totalLessons = 1 + (courseData.subLessons ? courseData.subLessons.length : 0);
//         const completedLessons = (courseData.completed ? 1 : 0) + 
//             (courseData.subLessons ? courseData.subLessons.filter(sl => sl.completed).length : 0);

//         setProgress(Math.round((completedLessons / totalLessons) * 100));
//     };

//     const handleMarkComplete = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(`${API_URL}/api/progress/upsert`, {
//                 courseId,
//                 lessonId: currentLesson.id,
//                 progress: 20
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Accept': 'application/json'
//                 }
//             });

//             toast({
//                 title: "Lesson completed",
//                 description: "Your progress has been updated.",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
            
//             // Navigate to the next sub-lesson or back to course
//             if (subLessonId) {
//                 const currentSubLessonIndex = course.subLessons.findIndex(sl => sl.id === subLessonId);
//                 if (currentSubLessonIndex < course.subLessons.length - 1) {
//                     navigate(`/course/${courseId}/lesson/${lessonId}/sub-lesson/${course.subLessons[currentSubLessonIndex + 1].id}`);
//                 } else {
//                     navigate(`/course/${courseId}`);
//                 }
//             } else {
//                 navigate(`/course/${courseId}`);
//             }
//         } catch (err) {
//             console.error('Error marking lesson as complete:', err);
//             toast({
//                 title: "Error",
//                 description: "Failed to mark lesson as complete. Please try again.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };

//     if (loading) {
//         return (
//             <Flex justify="center" align="center" height="100vh">
//                 <Spinner size="xl" />
//             </Flex>
//         );
//     }

//     if (error) {
//         return (
//             <Box textAlign="center" py={10} px={6}>
//                 <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, blue.400, blue.600)" backgroundClip="text">
//                     Error
//                 </Heading>
//                 <Text fontSize="18px" mt={3} mb={2}>
//                     {error}
//                 </Text>
//                 <Button colorScheme="blue" bgGradient="linear(to-r, blue.400, blue.500, blue.600)" color="white" variant="solid" onClick={() => navigate(`/course/${courseId}`)}>
//                     Go Back to Course
//                 </Button>
//             </Box>
//         );
//     }

//     return (
//         <Box bg="gray.50" minHeight="100vh">
//             <Box maxWidth="4xl" mx="auto" px={4} py={8}>
//                 <Button
//                     leftIcon={<ArrowLeft size={16} />}
//                     onClick={() => navigate(`/course/${courseId}`)}
//                     colorScheme="blue"
//                     variant="ghost"
//                     mb={6}
//                 >
//                     Back to Course
//                 </Button>

//                 <Box bg="white" shadow="xl" rounded="lg" overflow="hidden">
//                     <Box p={8}>
//                         <Flex align="center" mb={6}>
//                             <Book size={24} className="mr-2" />
//                             <Heading as="h1" size="xl" color="blue.600">
//                                 {currentLesson.title}
//                             </Heading>
//                         </Flex>

//                         <Progress value={progress} colorScheme="blue" mb={4} />
//                         <Text color="gray.600" mb={4}>Overall Progress: {progress}%</Text>

//                         {currentLesson.videoUrl && (
//                             <Box mb={6} position="relative" paddingTop="56.25%" height="0" overflow="hidden" rounded="md" shadow="md">
//                                 <iframe
//                                     src={currentLesson.videoUrl}
//                                     title={currentLesson.title}
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                     style={{
//                                         position: 'absolute',
//                                         top: 0,
//                                         left: 0,
//                                         width: '100%',
//                                         height: '100%',
//                                     }}
//                                 />
//                             </Box>
//                         )}

//                         <Text color="gray.700" mb={8} fontSize="lg">
//                             {currentLesson.content}
//                         </Text>

//                         <Flex justify="space-between" mt={8}>
//                             <Button 
//                                 leftIcon={<ArrowLeft size={16} />} 
//                                 onClick={() => navigate(`/course/${courseId}`)}
//                                 variant="outline"
//                                 colorScheme="blue"
//                             >
//                                 Back to Course
//                             </Button>
//                             <Button 
//                                 rightIcon={<CheckCircle size={16} />} 
//                                 colorScheme="green"
//                                 onClick={handleMarkComplete}
//                             >
//                                 Mark as Complete
//                             </Button>
//                         </Flex>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default LessonContent;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, CheckCircle, Book } from 'lucide-react';
import {
    Box,
    Button,
    Heading,
    Text,
    Flex,
    Spinner,
    useToast,
    Progress,
    VStack,
    HStack,
    Badge,
} from '@chakra-ui/react';
import API_URL from '../../Constants/Const';

const LessonContent = () => {
    const { courseId, lessonId, subLessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [currentContent, setCurrentContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const toast = useToast();

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/api/lesson/byCourse/${courseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (response.data && response.data.data.length > 0) {
                    const lessonData = response.data.data[0];
                    setLesson(lessonData);

                    if (subLessonId) {
                        const subLesson = lessonData.subLessons.find(sl => sl.id === subLessonId);
                        setCurrentContent(subLesson || lessonData);
                    } else {
                        setCurrentContent(lessonData);
                    }

                    calculateProgress(lessonData);
                } else {
                    throw new Error('No lesson data found.');
                }
            } catch (err) {
                console.error('Error fetching lesson:', err);
                setError('Failed to fetch lesson content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLessonData();
    }, [courseId, lessonId, subLessonId]);

    const calculateProgress = (lessonData) => {
        const totalLessons = 1 + (lessonData.subLessons ? lessonData.subLessons.length : 0);
        // For this example, we'll assume a lesson is completed if it exists
        // You may need to adjust this logic based on your actual data structure
        const completedLessons = 1 + (lessonData.subLessons ? lessonData.subLessons.length : 0);

        setProgress(Math.round((completedLessons / totalLessons) * 100));
    };

    const handleMarkComplete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/api/progress/upsert`, {
                courseId,
                lessonId: currentContent.id,
                progress: 20
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            toast({
                title: "Lesson completed",
                description: "Your progress has been updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            
            // Navigate to the next sub-lesson or back to course
            if (subLessonId) {
                const currentSubLessonIndex = lesson.subLessons.findIndex(sl => sl.id === subLessonId);
                if (currentSubLessonIndex < lesson.subLessons.length - 1) {
                    navigate(`/course/${courseId}/lesson/${lessonId}/sub-lesson/${lesson.subLessons[currentSubLessonIndex + 1].id}`);
                } else {
                    navigate(`/course/${courseId}`);
                }
            } else {
                navigate(`/course/${courseId}`);
            }
        } catch (err) {
            console.error('Error marking lesson as complete:', err);
            toast({
                title: "Error",
                description: "Failed to mark lesson as complete. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={10} px={6}>
                <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, blue.400, blue.600)" backgroundClip="text">
                    Error
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    {error}
                </Text>
                <Button colorScheme="blue" bgGradient="linear(to-r, blue.400, blue.500, blue.600)" color="white" variant="solid" onClick={() => navigate(`/course/${courseId}`)}>
                    Go Back to Course
                </Button>
            </Box>
        );
    }

    return (
        <Box bg="gray.50" minHeight="100vh">
            <Box maxWidth="4xl" mx="auto" px={4} py={8}>
                <Button
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={() => navigate(`/course/${courseId}`)}
                    colorScheme="blue"
                    variant="ghost"
                    mb={6}
                >
                    Back to Course
                </Button>

                <Box bg="white" shadow="xl" rounded="lg" overflow="hidden">
                    <Box p={8}>
                        <Flex align="center" mb={6}>
                            <Book size={24} className="mr-2" />
                            <Heading as="h1" size="xl" color="blue.600">
                                {currentContent.title}
                            </Heading>
                        </Flex>

                        <Progress value={progress} colorScheme="blue" mb={4} />
                        <Text color="gray.600" mb={4}>Overall Progress: {progress}%</Text>

                        {currentContent.videoUrl && (
                            <Box mb={6} position="relative" paddingTop="56.25%" height="0" overflow="hidden" rounded="md" shadow="md">
                                <iframe
                                    src={currentContent.videoUrl}
                                    title={currentContent.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                        )}

                        <Text color="gray.700" mb={8} fontSize="lg">
                            {currentContent.content}
                        </Text>

                        {!subLessonId && lesson.subLessons && lesson.subLessons.length > 0 && (
                            <VStack align="stretch" spacing={4} mt={8}>
                                <Heading as="h3" size="md">Sub-Lessons:</Heading>
                                {lesson.subLessons.map((subLesson, index) => (
                                    <HStack key={subLesson.id} justify="space-between">
                                        <Text>{subLesson.title}</Text>
                                        <Button
                                            size="sm"
                                            onClick={() => navigate(`/course/${courseId}/lesson/${lessonId}/sub-lesson/${subLesson.id}`)}
                                        >
                                            Go to Sub-Lesson
                                        </Button>
                                    </HStack>
                                ))}
                            </VStack>
                        )}

                        <Flex justify="space-between" mt={8}>
                            <Button 
                                leftIcon={<ArrowLeft size={16} />} 
                                onClick={() => navigate(`/course/${courseId}`)}
                                variant="outline"
                                colorScheme="blue"
                            >
                                Back to Course
                            </Button>
                            <Button 
                                rightIcon={<CheckCircle size={16} />} 
                                colorScheme="green"
                                onClick={handleMarkComplete}
                            >
                                Mark as Complete
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LessonContent;