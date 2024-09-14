import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Divider,
} from "@chakra-ui/react";

const SettingsPageInstructor = () => {
  return (
    <Box p={6}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl">Settings</Heading>
        
        <VStack align="stretch" spacing={4}>
          <Heading as="h2" size="lg">Account Settings</Heading>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value="john.doe@example.com" isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value="John Doe" />
          </FormControl>
          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" accept="image/*" />
          </FormControl>
          <Button colorScheme="blue" alignSelf="flex-start">Update Profile</Button>
        </VStack>

        <Divider />

        <VStack align="stretch" spacing={4}>
          <Heading as="h2" size="lg">Notification Preferences</Heading>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Receive email alerts
            </FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="course-updates" mb="0">
              Course update notifications
            </FormLabel>
            <Switch id="course-updates" />
          </FormControl>
        </VStack>

        <Divider />

        <VStack align="stretch" spacing={4}>
          <Heading as="h2" size="lg">Teaching Preferences</Heading>
          <FormControl>
            <FormLabel>Preferred Teaching Language</FormLabel>
            <Select placeholder="Select language">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Time Zone</FormLabel>
            <Select placeholder="Select time zone">
              <option value="utc">UTC</option>
              <option value="est">Eastern Standard Time</option>
              <option value="pst">Pacific Standard Time</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea placeholder="Tell us about yourself and your teaching experience" />
          </FormControl>
        </VStack>

        <HStack spacing={4}>
          <Button colorScheme="blue">Save All Settings</Button>
          <Button variant="outline">Cancel</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SettingsPageInstructor;