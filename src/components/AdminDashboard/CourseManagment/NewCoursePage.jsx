import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const NewCoursePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [course, setCourse] = useState({
    title: '',
    price: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('price', course.price);
    formData.append('description', course.description);
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    }

    try {
      const response = await fetch(`${API_URL}/api/course/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Course created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate('/courses');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: "Error creating course",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" mt={8}>
      <Heading mb={6}>Create New Course</Heading>
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
            <FormLabel>Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormControl>
          {previewUrl && (
            <Box>
              <Image src={previewUrl} alt="Preview" maxHeight="200px" objectFit="contain" />
            </Box>
          )}
          <Button type="submit" colorScheme="blue">Create Course</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default NewCoursePage;