import React from 'react';
import { Box, Heading } from "@chakra-ui/react";
import CourseForm from './CourseForm';

const CreateCourse = ({ onSubmit, onCancel }) => {
  return (
    <Box p={6}>
      <Heading as="h2" size="lg" mb={4}>Create New Course</Heading>
      <CourseForm onSubmit={onSubmit} onCancel={onCancel} />
    </Box>
  );
};

export default CreateCourse;