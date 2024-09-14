import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.xl" py={8}>
      <Flex align="center" mb={6}>
        <SettingsIcon boxSize={6} mr={2} />
        <Heading as="h1" size="xl">Settings</Heading>
      </Flex>

      <Stack spacing={8} direction={['column', null, 'row']}>
        <Box flex={1}>
          <VStack spacing={6} align="stretch" bg="chakra-subtle-bg" p={6} borderRadius="md" boxShadow="md">
            <Heading as="h2" size="lg">Account Information</Heading>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="Your full name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="your.email@example.com" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="••••••••" />
            </FormControl>
            <Button colorScheme="blue">Update Account</Button>
          </VStack>
        </Box>

        <Box flex={1}>
          <VStack spacing={6} align="stretch" bg="chakra-subtle-bg" p={6} borderRadius="md" boxShadow="md">
            <Heading as="h2" size="lg">Learning Preferences</Heading>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="dark-mode" mb="0">
                Dark Mode
              </FormLabel>
              <Switch id="dark-mode" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-notifications" mb="0">
                Email Notifications
              </FormLabel>
              <Switch id="email-notifications" />
            </FormControl>
            <FormControl>
              <FormLabel>Preferred Language</FormLabel>
              <Select placeholder="Select language">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Time Zone</FormLabel>
              <Select placeholder="Select time zone">
                <option value="utc">UTC</option>
                <option value="est">Eastern Time (ET)</option>
                <option value="pst">Pacific Time (PT)</option>
                <option value="cet">Central European Time (CET)</option>
              </Select>
            </FormControl>
          </VStack>
        </Box>
      </Stack>

      <Divider my={8} />

      <VStack spacing={6} align="stretch" bg="chakra-subtle-bg" p={6} borderRadius="md" boxShadow="md">
        <Heading as="h2" size="lg">Learning Goals</Heading>
        <FormControl>
          <FormLabel>Weekly Study Goal (hours)</FormLabel>
          <Input type="number" min={1} max={168} />
        </FormControl>
        <FormControl>
          <FormLabel>Primary Learning Objective</FormLabel>
          <Select placeholder="Select objective">
            <option value="career">Career Advancement</option>
            <option value="skills">Skill Development</option>
            <option value="hobby">Personal Interest</option>
            <option value="degree">Degree or Certification</option>
          </Select>
        </FormControl>
        <Button colorScheme="green">Save Learning Goals</Button>
      </VStack>

      <Box mt={8}>
        <Text fontSize="sm" color="gray.500">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </Box>
    </Container>
  );
};

export default Settings;