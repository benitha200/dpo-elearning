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

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Inactive' },
  // Add more user data as needed
];

const UsersPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Users</Heading>
      <Flex justify="space-between" align="center" mb={6}>
        <Input placeholder="Search users..." maxWidth="sm" />
        <Button colorScheme="blue">Add New User</Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple" bg={bg} borderWidth={1} borderColor={borderColor}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <Badge colorScheme={user.status === 'Active' ? 'green' : 'red'}>
                    {user.status}
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

export default UsersPage;