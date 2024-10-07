// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   useColorModeValue
// } from '@chakra-ui/react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import API_URL from '../../Constants/Const';

// const FinancePage = () => {
//   const [financialData, setFinancialData] = useState(null);
//   const bg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.700');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/pay/all`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await response.json();
//         setFinancialData(data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!financialData) {
//     return <Box>Loading...</Box>;
//   }

//   return (
//     <Box spacing={6}>
//       <Heading as="h1" size="xl" mb={6}>Finance</Heading>
      
//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
//         <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
//           <StatLabel>Total Revenue</StatLabel>
//           <StatNumber>${financialData.totalEarned}</StatNumber>
//           <StatHelpText>Total amount earned</StatHelpText>
//         </Stat>
//         <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
//           <StatLabel>Number of Courses</StatLabel>
//           <StatNumber>{financialData.courseEarnings.length}</StatNumber>
//           <StatHelpText>Courses generating revenue</StatHelpText>
//         </Stat>
//         <Stat bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
//           <StatLabel>Average Earnings per Course</StatLabel>
//           <StatNumber>
//             ${(financialData.totalEarned / financialData.courseEarnings.length).toFixed(2)}
//           </StatNumber>
//           <StatHelpText>Based on current data</StatHelpText>
//         </Stat>
//       </SimpleGrid>

//       <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor} mb={6}>
//         <Heading as="h2" size="md" mb={4}>Course Earnings Overview</Heading>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={financialData.courseEarnings}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="courseTitle" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="totalEarned" fill="#3182CE" />
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>

//       <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
//         <Heading as="h2" size="md" mb={4}>Course Earnings Details</Heading>
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Course Title</Th>
//               <Th>Course ID</Th>
//               <Th isNumeric>Total </Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {financialData.courseEarnings.map((course) => (
//               <Tr key={course.courseId}>
//                 <Td>{course.courseTitle}</Td>
//                 <Td>{course.courseId}</Td>
//                 <Td isNumeric>${course.totalEarned}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>
//     </Box>
//   );
// };

// export default FinancePage;

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
  TableContainer,
  useColorModeValue,
  Image,
  Text,
  HStack,
  VStack,
  Badge
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DOMPurify from 'dompurify';
import API_URL from '../../Constants/Const';

const FinancePage = () => {
  const [financialData, setFinancialData] = React.useState(null);
  const bgColor = useColorModeValue('white', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.500');
  const accentColor = useColorModeValue('blue.500', 'blue.300'); // Define accentColor here

  React.useEffect(() => {
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
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        Loading...
      </Box>
    );
  }

  const sanitizeHTML = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };

  const trimDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substr(0, description.lastIndexOf(' ', maxLength)) + '...';
  };

  const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  return (
    <Box maxWidth="container.xl" margin="auto" padding={8}>
      <Heading as="h1" size="xl" marginBottom={8} color={accentColor}>Finance Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} marginBottom={8}>
        <Stat backgroundColor={bgColor} padding={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber color={accentColor}>${financialData.totalEarned}</StatNumber>
          <StatHelpText>Total amount earned</StatHelpText>
        </Stat>
        <Stat backgroundColor={bgColor} padding={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Number of Courses</StatLabel>
          <StatNumber color={accentColor}>{financialData.courseEarnings.length}</StatNumber>
          <StatHelpText>Courses generating revenue</StatHelpText>
        </Stat>
        <Stat backgroundColor={bgColor} padding={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <StatLabel>Avg. Earnings per Course</StatLabel>
          <StatNumber color={accentColor}>
            ${(financialData.totalEarned / financialData.courseEarnings.length).toFixed(2)}
          </StatNumber>
          <StatHelpText>Based on current data</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box backgroundColor={bgColor} padding={4} borderRadius="md" borderWidth={1} borderColor={borderColor} marginBottom={8}>
        <Heading as="h2" size="md" marginBottom={4} color={accentColor}>Course Earnings Overview</Heading>
        <Box height="400px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData.courseEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="courseTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalEarned" fill={accentColor} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box backgroundColor={bgColor} padding={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="lg">
        <Heading as="h2" size="lg" marginBottom={6} color={accentColor}>Course Earnings Details</Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Course</Th>
                <Th>Description</Th>
                <Th isNumeric>Total Earned</Th>
              </Tr>
            </Thead>
            <Tbody>
              {financialData.courseEarnings.map((course) => (
                <Tr key={course.courseId}>
                  <Td>
                    <HStack spacing={4}>
                      <Image
                        src={course.imageUrl}
                        alt={course.courseTitle}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">{course.courseTitle}</Text>
                        {/* <Badge colorScheme="blue">{course.courseId}</Badge> */}
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    <Text
                      noOfLines={2}
                      dangerouslySetInnerHTML={sanitizeHTML(trimDescription(course.description))}
                    />
                  </Td>
                  <Td isNumeric>
                    {/* <Text fontWeight="bold" color={accentColor}>${course.totalEarned}</Text> */}
                    <Badge colorScheme="blue" fontWeight="bold" fontSize={14}>${course.totalEarned}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FinancePage;