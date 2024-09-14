import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Input,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";

const StudentRow = ({ name, email, course, progress, lastActive }) => (
  <Tr>
    <Td fontWeight="medium">{name}</Td>
    <Td>{email}</Td>
    <Td>{course}</Td>
    <Td>
      <VStack align="start" spacing={1}>
        <Progress value={progress} width="100%" size="sm" colorScheme="blue" />
        <Text fontSize="sm" color="gray.500">{progress}%</Text>
      </VStack>
    </Td>
    <Td>{lastActive}</Td>
    <Td>
      <Badge colorScheme={progress === 100 ? "green" : "blue"}>
        {progress === 100 ? "Completed" : "In Progress"}
      </Badge>
    </Td>
  </Tr>
);

const StudentsProgress = () => {
  const students = [
    { name: "Alice Johnson", email: "alice@example.com", course: "Introduction to Data Protection", progress: 75, lastActive: "2 hours ago" },
    { name: "Bob Smith", email: "bob@example.com", course: "GDPR Fundamentals", progress: 100, lastActive: "1 day ago" },
    { name: "Charlie Brown", email: "charlie@example.com", course: "Data Protection Impact Assessments", progress: 30, lastActive: "3 days ago" },
  ];

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Students Progress</Heading>
        <Card>
          <CardHeader>
            <Heading size="md">Student List</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Input placeholder="Search students..." />
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Course</Th>
                    <Th>Progress</Th>
                    <Th>Last Active</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {students.map((student, index) => (
                    <StudentRow key={index} {...student} />
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default StudentsProgress;