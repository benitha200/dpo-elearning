import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
  VStack,
} from "@chakra-ui/react";

const CourseCard = ({ title, description, students, lastUpdated }) => (
  <Card>
    <CardHeader>
      <Heading size="md">{title}</Heading>
      <Text>{description}</Text>
    </CardHeader>
    <CardBody>
      <Flex justifyContent="space-between" alignItems="center">
        <Badge colorScheme="blue">{students} students</Badge>
        <Text fontSize="sm" color="gray.500">Last updated: {lastUpdated}</Text>
      </Flex>
      <VStack mt={4} spacing={2} align="stretch">
        <Button variant="outline">Edit</Button>
        <Button colorScheme="blue">View</Button>
      </VStack>
    </CardBody>
  </Card>
);

const MyCoursesInstructor = () => {
  const courses = [
    { title: "Introduction to Data Protection", description: "Learn the basics of data protection and privacy laws.", students: 156, lastUpdated: "2 days ago" },
    { title: "GDPR Fundamentals", description: "Comprehensive guide to the General Data Protection Regulation.", students: 89, lastUpdated: "1 week ago" },
    { title: "Data Protection Impact Assessments", description: "How to conduct effective DPIAs for your organization.", students: 72, lastUpdated: "3 days ago" },
  ];

  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl">My Courses</Heading>
        <Button colorScheme="blue">Create New Course</Button>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </Grid>
    </Box>
  );
};

export default MyCoursesInstructor;