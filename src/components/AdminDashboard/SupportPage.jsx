import React from 'react';
import { HelpCircle, MessageSquare, FileQuestion, BookOpen, ExternalLink } from 'lucide-react';
import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Button, Input, Flex, VStack } from '@chakra-ui/react';

const SupportPage = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Support</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Flex align="center">
              <MessageSquare />
              <Heading size="md" ml={2}>Contact Support</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Input placeholder="Enter your question" />
              <Button>Submit Ticket</Button>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <FileQuestion />
              <Heading size="md" ml={2}>FAQs</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text>Find answers to common questions</Text>
              <Button>View FAQs</Button>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <BookOpen />
              <Heading size="md" ml={2}>Documentation</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text>Access detailed platform documentation</Text>
              <Button>View Docs</Button>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <ExternalLink />
              <Heading size="md" ml={2}>Community Forum</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text>Connect with other administrators</Text>
              <Button>Join Forum</Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default SupportPage;