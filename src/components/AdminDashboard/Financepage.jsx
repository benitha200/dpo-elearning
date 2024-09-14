import React from 'react';
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

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const transactions = [
  { id: 1, date: '2023-06-01', description: 'Course Purchase', amount: 99.99 },
  { id: 2, date: '2023-06-02', description: 'Subscription Renewal', amount: 29.99 },
  { id: 3, date: '2023-06-03', description: 'Course Bundle Sale', amount: 199.99 },
];

const FinancePage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box spacing={6}>
      <Heading as="h1" size="xl" mb={6}>Finance</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>$28,000</StatNumber>
          <StatHelpText>↑ 12% from last month</StatHelpText>
        </Stat>
        <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Active Subscriptions</StatLabel>
          <StatNumber>1,240</StatNumber>
          <StatHelpText>↑ 5% from last month</StatHelpText>
        </Stat>
        <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Average Order Value</StatLabel>
          <StatNumber>$85.50</StatNumber>
          <StatHelpText>↓ 2% from last month</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor} mb={6}>
        <Heading as="h2" size="md" mb={4}>Revenue Overview</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
        <Heading as="h2" size="md" mb={4}>Recent Transactions</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.description}</Td>
                <Td isNumeric>${transaction.amount.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button mt={4} colorScheme="blue">View All Transactions</Button>
      </Box>
    </Box>
  );
};

export default FinancePage;