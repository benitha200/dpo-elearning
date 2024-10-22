import React, { useState, useEffect } from 'react';
import { MessageSquare, PenTool, ThumbsUp, Send, Reply } from 'lucide-react';
import {
    Box,
    Container,
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Card,
    CardBody,
    Button,
    Textarea,
    Avatar,
    Text,
    VStack,
    HStack,
    Divider,
    IconButton,
    useColorModeValue,
    Spinner,
    Alert,
    AlertIcon,
    Badge,
    Collapse,
    useDisclosure,
    Tooltip,
    useToast
} from '@chakra-ui/react';
import API_URL from '../../Constants/Const';

const LessonContentTabs = ({ lessonId, content }) => {
    const [discussions, setDiscussions] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState({});
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openReplies, setOpenReplies] = useState({});
    const toast = useToast();
    const [selectedTab, setSelectedTab] = useState(0);

    // Chakra UI color modes
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const bgColor = useColorModeValue('white', 'gray.800');
    const hoverBg = useColorModeValue('gray.50', 'gray.700');
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    // Get auth token from localStorage or your auth management system
    const getAuthToken = () => {
        return localStorage.getItem('token'); // Replace with your token storage method
    };

    // Common headers for all requests
    const getHeaders = () => {
        const token = getAuthToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    // Handle unauthorized responses
    const handleUnauthorized = () => {
        toast({
            title: "Session expired",
            description: "Please log in again to continue.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
        // Add your logout or redirect logic here
        // For example: router.push('/login');
    };

    // Common fetch wrapper with error handling
    const fetchWithAuth = async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: getHeaders(),
            });

            if (response.status === 401) {
                handleUnauthorized();
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const fetchDiscussions = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchWithAuth(`${API_URL}/api/discussion/byLesson/${lessonId}`);
            setDiscussions(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.error('Error fetching discussions:', error);
            setError("No dissussions Yet");
            // if (error.message !== 'Unauthorized') {
            //     toast({
            //         title: "Error",
            //         description: "Failed to load discussions. Please try again.",
            //         status: "error",
            //         duration: 5000,
            //         isClosable: true,
            //     });
            // }
            if (error.message !== 'Unauthorized') {
                toast({
                    title: "info",
                    description: "No discussions yet",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscussions();
    }, [lessonId]);

    const handleSubmitComment = async () => {
        try {
            await fetchWithAuth(`${API_URL}/api/discussion/create/${lessonId}`, {
                method: 'POST',
                body: JSON.stringify({ content: newComment })
            });
            setNewComment('');
            fetchDiscussions();
            toast({
                title: "Success",
                description: "Comment posted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error posting comment:', error);
            if (error.message !== 'Unauthorized') {
                toast({
                    title: "Error",
                    description: "Failed to post comment. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const handleReply = async (discussionId) => {
        try {
            await fetchWithAuth(`${API_URL}/api/discussion/create/${lessonId}`, {
                method: 'POST',
                body: JSON.stringify({
                    content: replyText[discussionId],
                    parentId: discussionId
                })
            });
            setReplyText(prev => ({ ...prev, [discussionId]: '' }));
            fetchDiscussions();
            toast({
                title: "Success",
                description: "Reply posted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error posting reply:', error);
            if (error.message !== 'Unauthorized') {
                toast({
                    title: "Error",
                    description: "Failed to post reply. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const handleLike = async (discussionId) => {
        try {
            await fetchWithAuth(`${API_URL}/api/like/discussion/${discussionId}`, {
                method: 'POST'
            });
            fetchDiscussions();
        } catch (error) {
            console.error('Error liking discussion:', error);
            if (error.message !== 'Unauthorized') {
                toast({
                    title: "Error",
                    description: "Failed to like discussion. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const toggleReplies = (discussionId) => {
        setOpenReplies(prev => ({
            ...prev,
            [discussionId]: !prev[discussionId]
        }));
    };

    const renderDiscussions = () => {
        if (isLoading) {
            return (
                <Flex justify="center" align="center" h="200px">
                    <Spinner size="xl" color="blue.500" thickness="4px" />
                </Flex>
            );
        }

        if (error) {
            return (
                <Alert status="error" variant="left-accent" borderRadius="md">
                    <AlertIcon />
                    {error}
                </Alert>
            );
        }

        if (!Array.isArray(discussions) || discussions.length === 0) {
            return (
                <Alert status="info" variant="left-accent" borderRadius="md">
                    <AlertIcon />
                    No discussions yet. Be the first to comment!
                </Alert>
            );
        }

        return discussions.map((discussion) => (
            <Card
                key={discussion.id}
                bg={cardBg}
                shadow="sm"
                mb={4}
                borderRadius="lg"
                overflow="hidden"
            >
                <CardBody>
                    <HStack spacing={4} align="start">
                        <Avatar
                            size="md"
                            name={discussion.userName}
                            src={discussion.userAvatar}
                        />
                        <VStack align="stretch" flex={1} spacing={2}>
                            <HStack justify="space-between">
                                <Text fontWeight="bold" fontSize="md">
                                    {discussion.userName}
                                </Text>
                                <Text fontSize="sm" color={textColor}>
                                    {new Date(discussion.createdAt).toLocaleDateString()}
                                </Text>
                            </HStack>

                            <Text fontSize="md">{discussion.content}</Text>

                            <HStack spacing={4}>
                                <Tooltip label="Like this comment">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        leftIcon={<ThumbsUp size={16} />}
                                        onClick={() => handleLike(discussion.id)}
                                        color={discussion.isLiked ? "blue.500" : undefined}
                                    >
                                        {discussion.likes || 0}
                                    </Button>
                                </Tooltip>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    leftIcon={<Reply size={16} />}
                                    onClick={() => toggleReplies(discussion.id)}
                                >
                                    {Array.isArray(discussion.replies) ? discussion.replies.length : 0} Replies
                                </Button>
                            </HStack>

                            <Collapse in={openReplies[discussion.id]} animateOpacity>
                                {Array.isArray(discussion.replies) && discussion.replies.map((reply) => (
                                    <Box
                                        key={reply.id}
                                        ml={8}
                                        mt={2}
                                        borderLeftWidth="2px"
                                        borderColor={borderColor}
                                        pl={4}
                                        py={2}
                                    >
                                        <HStack spacing={4} align="start">
                                            <Avatar
                                                size="sm"
                                                name={reply.userName}
                                                src={reply.userAvatar}
                                            />
                                            <VStack align="stretch" flex={1} spacing={1}>
                                                <HStack justify="space-between">
                                                    <Text fontWeight="bold" fontSize="sm">
                                                        {reply.userName}
                                                    </Text>
                                                    <Text fontSize="xs" color={textColor}>
                                                        {new Date(reply.createdAt).toLocaleDateString()}
                                                    </Text>
                                                </HStack>
                                                <Text fontSize="sm">{reply.content}</Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                ))}

                                <Box mt={4}>
                                    <Textarea
                                        placeholder="Write a reply..."
                                        size="sm"
                                        value={replyText[discussion.id] || ''}
                                        onChange={(e) => setReplyText(prev => ({
                                            ...prev,
                                            [discussion.id]: e.target.value
                                        }))}
                                        bg={bgColor}
                                    />
                                    <Button
                                        size="sm"
                                        mt={2}
                                        colorScheme="blue"
                                        rightIcon={<Send size={16} />}
                                        onClick={() => handleReply(discussion.id)}
                                        isDisabled={!replyText[discussion.id]?.trim()}
                                    >
                                        Send Reply
                                    </Button>
                                </Box>
                            </Collapse>
                        </VStack>
                    </HStack>
                </CardBody>
            </Card>
        ));
    };

    return (
        // <Flex direction={{ base: 'column', lg: 'row' }} gap={6} w="full">
        //     <Box w={{ base: 'full', lg: '400px' }}>
        //         <Tabs variant="soft-rounded" colorScheme="blue">
        //             <TabList>

        //                 <Tab>
        //                     <HStack spacing={2}>
        //                         <PenTool size={16} />
        //                         <Text>Notes</Text>
        //                     </HStack>
        //                 </Tab>
        //                 <Tab>
        //                     <HStack spacing={2}>
        //                         <MessageSquare size={16} />
        //                         <Text>Discussion</Text>
        //                     </HStack>
        //                 </Tab>
        //             </TabList>

        //             <TabPanels>
        //                 <TabPanel p={0} mt={4}>
        //                     <Box flex="1" p={4} bg={bgColor} borderRadius="lg" shadow="sm">
        //                         <Box dangerouslySetInnerHTML={{ __html: content }} />
        //                     </Box>
        //                 </TabPanel>
        //                 <TabPanel p={0} mt={4}>
        //                     <Card variant="outline" bg={bgColor}>
        //                         <CardBody>
        //                             <HStack spacing={4} align="stretch">
        //                                 <Textarea
        //                                     placeholder="Start a discussion..."
        //                                     value={newComment}
        //                                     onChange={(e) => setNewComment(e.target.value)}
        //                                     size="md"
        //                                     bg={bgColor}
        //                                 />
        //                                 <Button
        //                                     colorScheme="blue"
        //                                     onClick={handleSubmitComment}
        //                                     isDisabled={!newComment.trim()}
        //                                     rightIcon={<Send size={16} />}
        //                                 >
        //                                     Post Comment
        //                                 </Button>

        //                                 <Divider />

        //                                 <VStack spacing={4} align="stretch">
        //                                     {renderDiscussions()}
        //                                 </VStack>
        //                             </HStack>
        //                         </CardBody>
        //                     </Card>
        //                 </TabPanel>

        //             </TabPanels>
        //         </Tabs>
        //     </Box>
        // </Flex>

        <div className="min-h-screen bg-gray-50">
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex-1">
          <div className="w-full border-b border-gray-200">
            <div className="flex w-full">
              <button
                onClick={() => setSelectedTab(0)}
                className={`flex-1 py-4 px-6 text-center border-b-2 ${
                  selectedTab === 0 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setSelectedTab(1)}
                className={`flex-1 py-4 px-6 text-center border-b-2 ${
                  selectedTab === 1 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Discussion
              </button>
            </div>
          </div>

          <div className="p-4">
            {selectedTab === 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <Box dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}
            
            {selectedTab === 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Write a comment..."
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Post Comment
                    </button>
                  </div>
                  <hr className="my-6" />
                  <div className="space-y-4">
                    {renderDiscussions()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
};

export default LessonContentTabs;