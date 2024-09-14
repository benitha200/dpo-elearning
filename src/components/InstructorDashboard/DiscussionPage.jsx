import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Input,
  Textarea,
  Divider,
} from "@chakra-ui/react";

const DiscussionPost = ({ author, date, content, replies }) => (
  <Box borderWidth={1} borderRadius="lg" p={4} mb={4}>
    <HStack spacing={4} mb={2}>
      <Avatar name={author} />
      <VStack align="start" spacing={0}>
        <Text fontWeight="bold">{author}</Text>
        <Text fontSize="sm" color="gray.500">{date}</Text>
      </VStack>
    </HStack>
    <Text mb={4}>{content}</Text>
    <Button size="sm" colorScheme="blue">Reply</Button>
    {replies && replies.length > 0 && (
      <VStack align="stretch" mt={4} ml={8}>
        {replies.map((reply, index) => (
          <Box key={index} borderWidth={1} borderRadius="lg" p={3}>
            <HStack spacing={4} mb={2}>
              <Avatar name={reply.author} size="sm" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize="sm">{reply.author}</Text>
                <Text fontSize="xs" color="gray.500">{reply.date}</Text>
              </VStack>
            </HStack>
            <Text fontSize="sm">{reply.content}</Text>
          </Box>
        ))}
      </VStack>
    )}
  </Box>
);

const DiscussionPage = () => {
  const discussions = [
    {
      author: "John Doe",
      date: "2023-09-14",
      content: "What are the key differences between GDPR and CCPA?",
      replies: [
        {
          author: "Jane Smith",
          date: "2023-09-14",
          content: "The main differences are in the scope of application and the specific rights granted to individuals..."
        }
      ]
    },
    {
      author: "Alice Johnson",
      date: "2023-09-13",
      content: "How do you conduct a successful Data Protection Impact Assessment?",
      replies: []
    }
  ];

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Discussion Forum</Heading>
        <Box>
          <Heading as="h2" size="md" mb={2}>Start a New Discussion</Heading>
          <VStack spacing={4} align="stretch">
            <Input placeholder="Discussion Title" />
            <Textarea placeholder="What's on your mind?" />
            <Button colorScheme="blue" alignSelf="flex-end">Post</Button>
          </VStack>
        </Box>
        <Divider />
        <VStack spacing={4} align="stretch">
          {discussions.map((discussion, index) => (
            <DiscussionPost key={index} {...discussion} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default DiscussionPage;