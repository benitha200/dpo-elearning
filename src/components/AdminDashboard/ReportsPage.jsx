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
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

const reportTypes = [
  { id: 1, name: 'User Engagement', description: 'Analysis of user activity and interaction with courses' },
  { id: 2, name: 'Course Performance', description: 'Metrics on course completion rates and ratings' },
  { id: 3, name: 'Revenue Analysis', description: 'Detailed breakdown of revenue sources and trends' },
  { id: 4, name: 'Instructor Performance', description: 'Evaluation of instructor ratings and course success' },
];

const recentReports = [
  { id: 1, name: 'Q2 Revenue Report', type: 'Revenue Analysis', date: '2023-07-01', status: 'Completed' },
  { id: 2, name: 'User Engagement June 2023', type: 'User Engagement', date: '2023-06-30', status: 'In Progress' },
  { id: 3, name: 'Top Performing Courses 2023', type: 'Course Performance', date: '2023-06-15', status: 'Completed' },
];

const ReportsPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Reports</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        {reportTypes.map((report) => (
          <Box key={report.id} bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
            <Heading as="h3" size="md" mb={2}>{report.name}</Heading>
            <Box mb={4}>{report.description}</Box>
            <Button colorScheme="blue">Generate Report</Button>
          </Box>
        ))}
      </SimpleGrid>

      <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
        <Heading as="h2" size="md" mb={4}>Recent Reports</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Report Name</Th>
              <Th>Type</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentReports.map((report) => (
              <Tr key={report.id}>
                <Td>{report.name}</Td>
                <Td>{report.type}</Td>
                <Td>{report.date}</Td>
                <Td>
                  <Badge colorScheme={report.status === 'Completed' ? 'green' : 'yellow'}>
                    {report.status}
                  </Badge>
                </Td>
                <Td>
                  <Button size="sm" colorScheme="blue">View</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ReportsPage;