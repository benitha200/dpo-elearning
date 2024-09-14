import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, PlayCircle, FileText, Download } from 'lucide-react';
import {
    Box,
    Button,
    VStack,
    Heading,
    Text,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    List,
    ListItem,
    ListIcon,
    Link,
    Flex,
    Spinner,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const LessonContent = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            const mockLesson = {
                id: lessonId,
                title: 'Introduction to HTML',
                type: 'video',
                content: 'In this lesson, we\'ll cover the basics of HTML, including its structure, common tags, and how to create your first web page.',
                videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
                duration: '45:30',
                nextLessonId: '2',
                sections: [
                    {
                        title: 'What is HTML?',
                        content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.',
                    },
                    {
                        title: 'Basic Structure of an HTML Document',
                        content: 'An HTML document starts with a DOCTYPE declaration, followed by the <html> element, which contains the <head> and <body> elements.',
                    },
                    {
                        title: 'Common HTML Tags',
                        content: 'Some common HTML tags include <h1> to <h6> for headings, <p> for paragraphs, <a> for links, and <img> for images.',
                    },
                ],
                quiz: [
                    {
                        question: 'What does HTML stand for?',
                        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
                        correctAnswer: 0,
                    },
                    {
                        question: 'Which tag is used to define an unordered list in HTML?',
                        options: ['<ol>', '<li>', '<ul>', '<list>'],
                        correctAnswer: 2,
                    },
                ],
                resources: [
                    { name: 'HTML Cheat Sheet', type: 'pdf', url: '#' },
                    { name: 'Sample HTML Code', type: 'code', url: '#' },
                ],
            };
            setLesson(mockLesson);
        };

        fetchLesson();
    }, [lessonId]);

    if (!lesson) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    const getLessonIcon = (type) => {
        switch (type) {
            case 'video':
                return <PlayCircle />;
            case 'reading':
                return <FileText />;
            case 'exercise':
                return <Download />;
            default:
                return null;
        }
    };

    return (
        <Box bg="gray.100" minHeight="100vh">
            <Box maxWidth="4xl" mx="auto" px={4} py={8}>
                <Button
                    leftIcon={<ArrowLeft />}
                    onClick={() => navigate(`/course/${courseId}`)}
                    colorScheme="blue"
                    variant="ghost"
                    mb={6}
                >
                    Back to Course
                </Button>

                <Box bg="white" shadow="lg" rounded="lg" overflow="hidden">
                    <Box p={6}>
                        <Flex align="center" mb={4}>
                            {getLessonIcon(lesson.type)}
                            <Heading as="h1" size="xl" ml={2}>
                                {lesson.title}
                            </Heading>
                        </Flex>

                        {lesson.type === 'video' && (
                            <Box mb={6} position="relative" paddingTop="56.25%" height="0" overflow="hidden">
                                <iframe
                                    src={lesson.videoUrl}
                                    title={lesson.title}
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


                        <Text color="gray.600" mb={6}>
                            {lesson.content}
                        </Text>

                        <Accordion allowMultiple mb={6}>
                            {lesson.sections.map((section, index) => (
                                <AccordionItem key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                {section.title}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Text color="gray.600">{section.content}</Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <Heading as="h2" size="lg" mb={4}>
                            Quiz
                        </Heading>
                        <VStack align="stretch" spacing={4} mb={6}>
                            {lesson.quiz.map((question, index) => (
                                <Box key={index}>
                                    <Text fontWeight="medium" mb={2}>
                                        {question.question}
                                    </Text>
                                    <List spacing={1}>
                                        {question.options.map((option, optionIndex) => (
                                            <ListItem key={optionIndex}>
                                                <ListIcon as={MdCheckCircle} color="green.500" />
                                                {option}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            ))}
                        </VStack>

                        <Heading as="h2" size="lg" mb={4}>
                            Additional Resources
                        </Heading>
                        <List spacing={2} mb={8}>
                            {lesson.resources.map((resource, index) => (
                                <ListItem key={index}>
                                    <Link color="blue.600" href={resource.url}>
                                        {resource.name} ({resource.type})
                                    </Link>
                                </ListItem>
                            ))}
                        </List>

                        <Flex align="center" justify="space-between">
                            <Text fontSize="sm" color="gray.500">
                                Duration: {lesson.duration}
                            </Text>
                            <Flex>
                                <Button colorScheme="blue" mr={4}>
                                    Next Lesson
                                </Button>
                                <Button leftIcon={<CheckCircle />} variant="outline">
                                    Mark as Complete
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LessonContent;