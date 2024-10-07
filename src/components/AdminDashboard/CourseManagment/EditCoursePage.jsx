import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Image
} from '@chakra-ui/react';
import API_URL from '../../../Constants/Const';

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [course, setCourse] = useState({
    title: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${API_URL}/api/course/single/${id}`);
      const result = await response.json();
      if (result.message === "Course found" && result.data) {
        setCourse({
          title: result.data.title,
          price: result.data.price,
          description: result.data.description,
          imageUrl: result.data.imageUrl
        });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Error fetching course",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted", course);
    const token = localStorage.getItem('token')
    console.log(JSON.stringify(course));
    try {
      const response = await fetch(`${API_URL}/api/course/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });
      
      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Course updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate('/courses');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Error updating course",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" mt={8}>
      <Heading mb={6}>Edit Course</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={course.title} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input name="price" type="number" value={course.price} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={course.description} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input name="imageUrl" value={course.imageUrl} onChange={handleChange} />
          </FormControl>
          {course.imageUrl && (
            <Box>
              <FormLabel>Image Preview</FormLabel>
              <Image src={course.imageUrl} alt="Course preview" maxWidth="100%" maxHeight="200px" objectFit="contain" />
            </Box>
          )}
          <Button type="submit" colorScheme="blue">Update Course</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditCoursePage;