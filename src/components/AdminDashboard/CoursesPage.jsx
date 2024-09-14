import React from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Flex,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

const courses = [
  { id: 1, title: 'Introduction to React', instructor: 'John Doe', students: 120, status: 'Active' },
  { id: 2, title: 'Advanced Python Programming', instructor: 'Jane Smith', students: 85, status: 'Draft' },
  { id: 3, title: 'Data Science Fundamentals', instructor: 'Bob Johnson', students: 200, status: 'Active' },
  // Add more course data as needed
];

const CoursesPageAdmin = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Courses</Heading>
      <Flex justify="space-between" align="center" mb={6}>
        <Input placeholder="Search courses..." maxWidth="sm" />
        <Button colorScheme="blue">Add New Course</Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple" bg={bg} borderWidth={1} borderColor={borderColor}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Instructor</Th>
              <Th>Students</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.title}</Td>
                <Td>{course.instructor}</Td>
                <Td>{course.students}</Td>
                <Td>
                  <Badge colorScheme={course.status === 'Active' ? 'green' : 'yellow'}>
                    {course.status}
                  </Badge>
                </Td>
                <Td>
                  <Button size="sm" variant="ghost" mr={2}>Edit</Button>
                  <Button size="sm" variant="ghost" colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default CoursesPageAdmin;