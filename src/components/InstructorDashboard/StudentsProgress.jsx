import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const StudentRow = ({ firstName, lastName, email, courseTitle, progress, lastActive }) => (
  <Tr>
    <Td fontWeight="medium">{`${firstName} ${lastName}`}</Td>
    <Td>{email}</Td>
    <Td>{courseTitle}</Td>
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
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/enroll/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Replace with actual token
          }
        });
        const fetchedStudents = response.data.data.map((enroll) => ({
          firstName: enroll.user.firstName,
          lastName: enroll.user.lastName,
          email: enroll.user.email,
          courseTitle: enroll.course.title,
          progress: 75,  // Placeholder value, you can replace it with actual progress if available
          lastActive: "2 days ago",  // Placeholder value
        }));
        setStudents(fetchedStudents);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students data');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

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
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                  {filteredStudents.map((student, index) => (
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
