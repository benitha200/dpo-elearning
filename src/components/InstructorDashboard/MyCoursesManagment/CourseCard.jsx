import React from 'react';
import { Box, Button, Image, Text, VStack, Flex, Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import DOMPurify from 'dompurify';

const CourseCard = ({ course, onView, onDelete }) => {
  const sanitizeHTML = (html) => ({
    __html: DOMPurify.sanitize(html)
  });

  return (
    <Card width="400px" height="400px" display="flex" flexDirection="column" borderRadius="lg" overflow="hidden" margin={0}>
      <CardHeader padding={0}>
        {course.imageUrl ? (
          <Image 
            src={course.imageUrl} 
            alt={course.title} 
            height="200px" 
            width="100%" 
            objectFit="cover"
          />
        ) : (
          <Box 
            height="160px" 
            bg="gray.200" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Text>No image available</Text>
          </Box>
        )}
      </CardHeader>
      <CardBody flex={1} overflow="hidden" padding={1}>
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="bold" fontSize="xl" noOfLines={1}>{course.title}</Text>
          <Text fontWeight="semibold">Description:</Text>
          <Box height="96px" overflowY="auto" fontSize="sm">
            <Box 
              dangerouslySetInnerHTML={sanitizeHTML(course.description)}
              sx={{
                'h1, h2, h3, h4, h5, h6': { fontSize: 'inherit', fontWeight: 'bold', margin: '0.5em 0' },
                'p': { margin: '0.5em 0' },
                'ol, ul': { paddingLeft: '1.5em', margin: '0.5em 0' },
                'li': { margin: '0.25em 0' },
              }}
            />
          </Box>
          <Text mt={2}>Price: ${course.price}</Text>
        </VStack>
      </CardBody>
      <CardFooter padding={4}>
        <Flex width="100%" justifyContent="space-between">
          <Button onClick={() => onView(course.id)} flex={1} mr={2} size="sm">
            View/Edit
          </Button>
          <Button 
            onClick={() => onDelete(course.id)} 
            flex={1} 
            ml={2} 
            colorScheme="red"
            size="sm"
          >
            Delete
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;