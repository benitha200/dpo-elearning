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
  VStack,
  HStack,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const AssignmentRow = ({ title, dueDate, course, status }) => (
  <Tr>
    <Td>{title}</Td>
    <Td>{dueDate}</Td>
    <Td>{course}</Td>
    <Td>
      <Badge colorScheme={status === 'Active' ? 'green' : 'red'}>{status}</Badge>
    </Td>
    <Td>
      <Button size="sm" colorScheme="blue">Edit</Button>
    </Td>
  </Tr>
);

const AssignmentsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const assignments = [
    { title: "GDPR Case Study", dueDate: "2023-10-15", course: "GDPR Fundamentals", status: "Active" },
    { title: "Privacy Impact Assessment", dueDate: "2023-10-30", course: "Data Protection Impact Assessments", status: "Draft" },
    { title: "Data Breach Response Plan", dueDate: "2023-11-05", course: "Introduction to Data Protection", status: "Active" },
  ];

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Heading as="h1" size="xl">Assignments</Heading>
          <Button colorScheme="blue" onClick={onOpen}>Create New Assignment</Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Due Date</Th>
              <Th>Course</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assignments.map((assignment, index) => (
              <AssignmentRow key={index} {...assignment} />
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Enter assignment title" />
              </FormControl>
              <FormControl>
                <FormLabel>Due Date</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>Course</FormLabel>
                <Input placeholder="Select course" />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Enter assignment description" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>Save</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AssignmentsPage;