import React from 'react';
import { Settings2, Bell, Globe, Palette, Upload } from 'lucide-react';
import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Button, Switch, Select, Flex, VStack, HStack } from '@chakra-ui/react';

const SettingsPageAdmin = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Settings</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Bell />
              <Heading size="md" ml={2}>Notifications</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text>Email Notifications</Text>
                <Switch />
              </HStack>
              <HStack justify="space-between">
                <Text>Push Notifications</Text>
                <Switch />
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Globe />
              <Heading size="md" ml={2}>Language</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <Select placeholder="Select language">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </Select>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Palette />
              <Heading size="md" ml={2}>Theme</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <Select placeholder="Select theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </Select>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex align="center">
              <Upload />
              <Heading size="md" ml={2}>Backups</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text>Configure automatic backups</Text>
              <Button>Manage Backups</Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default SettingsPageAdmin;