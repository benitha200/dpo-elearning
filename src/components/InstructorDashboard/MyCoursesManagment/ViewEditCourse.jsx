import React from 'react';
import { Box, Heading } from "@chakra-ui/react";
import CourseForm from './CourseForm';

const ViewEditCourse = ({ course, onSubmit, onCancel }) => {
  return (
    <Box p={6}>
      <Heading as="h2" size="lg" mb={4}>View/Edit Course</Heading>
      <CourseForm course={course} onSubmit={onSubmit} onCancel={onCancel} />
    </Box>
  );
};

export default ViewEditCourse;