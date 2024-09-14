import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  useColorModeValue
} from '@chakra-ui/react';

const dataCategories = [
  { id: 1, name: 'User Data', size: '1.2 GB', lastBackup: '2023-07-01' },
  { id: 2, name: 'Course Content', size: '15.7 GB', lastBackup: '2023-07-01' },
  { id: 3, name: 'Analytics Data', size: '3.5 GB', lastBackup: '2023-07-01' },
  { id: 4, name: 'Financial Records', size: '500 MB', lastBackup: '2023-07-01' },
];

const DataManagementPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Data Management</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <Heading as="h2" size="md" mb={4}>Storage Overview</Heading>
          <Progress value={65} size="lg" colorScheme="blue" mb={2} />
          <Box>13.5 GB used of 20 GB total</Box>
        </Box>
        <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <Heading as="h2" size="md" mb={4}>Quick Actions</Heading>
          <SimpleGrid columns={2} spacing={4}>
            <Button colorScheme="blue">Backup Data</Button>
            <Button colorScheme="green">Restore Data</Button>
            <Button colorScheme="yellow">Optimize Storage</Button>
            <Button colorScheme="red">Purge Old Data</Button>
          </SimpleGrid>
        </Box>
      </SimpleGrid>

      <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
        <Heading as="h2" size="md" mb={4}>Data Categories</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Category</Th>
              <Th>Size</Th>
              <Th>Last Backup</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataCategories.map((category) => (
              <Tr key={category.id}>
                <Td>{category.name}</Td>
                <Td>{category.size}</Td>
                <Td>{category.lastBackup}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2}>Backup</Button>
                  <Button size="sm" colorScheme="green">Manage</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default DataManagementPage;