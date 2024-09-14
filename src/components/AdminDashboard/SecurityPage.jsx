import React from 'react';
import { Shield, Lock, Eye, UserPlus, Key } from 'lucide-react';
import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Button, Flex, VStack } from '@chakra-ui/react';

const SecurityPage = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Security</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Lock />
              <Heading size="md" ml={2}>Access Control</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={4}>
              <Text>Manage user roles and permissions</Text>
              <Button>Manage Roles</Button>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Eye />
              <Heading size="md" ml={2}>Activity Monitoring</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={4}>
              <Text>View recent login attempts and user activities</Text>
              <Button>View Logs</Button>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <UserPlus />
              <Heading size="md" ml={2}>User Authentication</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={4}>
              <Text>Configure two-factor authentication settings</Text>
              <Button>Setup 2FA</Button>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Key />
              <Heading size="md" ml={2}>API Keys</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={4}>
              <Text>Manage API keys for external integrations</Text>
              <Button>Manage Keys</Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default SecurityPage;