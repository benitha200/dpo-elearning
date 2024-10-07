import React from 'react';
import { Box, Button, Image, Text, VStack, Flex, Card, CardHeader, CardBody, CardFooter, Badge, Heading } from "@chakra-ui/react";
import DOMPurify from 'dompurify';

const CourseCard = ({ course, onView, onDelete }) => {
  const sanitizeHTML = (html) => ({
    __html: DOMPurify.sanitize(html)
  });

  return (
    <Card
      width="350px"
      height="450px"
      display="flex"
      flexDirection="column"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
    >
      <CardHeader padding={0} position="relative">
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
            height="200px" 
            bg="gray.200" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Text fontWeight="medium" color="gray.500">No image available</Text>
          </Box>
        )}
        <Badge
          position="absolute"
          top="2"
          right="2"
          colorScheme="green"
          fontSize="0.8em"
          borderRadius="full"
          px="2"
        >
          ${course.price}
        </Badge>
      </CardHeader>
      <CardBody flex={1} overflow="hidden" padding={4}>
        <VStack align="stretch" spacing={3}>
          <Heading as="h3" size="md" noOfLines={2}>{course.title}</Heading>
          {/* <Text fontWeight="medium" color="gray.600" fontSize="sm">Description:</Text> */}
          <Box 
            height="100px" 
            overflowY="auto" 
            fontSize="sm" 
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray.300',
                borderRadius: '24px',
              },
            }}
          >
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
        </VStack>
      </CardBody>
      <CardFooter padding={4}>
        <Flex width="100%" justifyContent="space-between">
          <Button 
            onClick={() => onView(course.id)} 
            flex={1} 
            mr={2} 
            colorScheme="blue" 
            variant="outline"
          >
            View/Edit
          </Button>
          <Button 
            onClick={() => onDelete(course.id)} 
            flex={1} 
            ml={2} 
            colorScheme="red"
            variant="solid"
          >
            Delete
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;