import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_URL from '../../Constants/Const';

const FinancePage = () => {
  const [financialData, setFinancialData] = useState(null);
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/pay/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setFinancialData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!financialData) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Finance</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>${financialData.totalEarned}</StatNumber>
          <StatHelpText>Total amount earned</StatHelpText>
        </Stat>
        <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Number of Courses</StatLabel>
          <StatNumber>{financialData.courseEarnings.length}</StatNumber>
          <StatHelpText>Courses generating revenue</StatHelpText>
        </Stat>
        <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Average Earnings per Course</StatLabel>
          <StatNumber>
            ${(financialData.totalEarned / financialData.courseEarnings.length).toFixed(2)}
          </StatNumber>
          <StatHelpText>Based on current data</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor} mb={6}>
        <Heading as="h2" size="md" mb={4}>Course Earnings Overview</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financialData.courseEarnings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseTitle" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalEarned" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
        <Heading as="h2" size="md" mb={4}>Course Earnings Details</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course Title</Th>
              <Th>Course ID</Th>
              <Th isNumeric>Total </Th>
            </Tr>
          </Thead>
          <Tbody>
            {financialData.courseEarnings.map((course) => (
              <Tr key={course.courseId}>
                <Td>{course.courseTitle}</Td>
                <Td>{course.courseId}</Td>
                <Td isNumeric>${course.totalEarned}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default FinancePage;