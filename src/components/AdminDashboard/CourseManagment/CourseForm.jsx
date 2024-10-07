import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  VStack,
  Input,
  Button,
  Image,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Box,
  Text,
  useColorModeValue,
  Icon,
  Flex
} from "@chakra-ui/react";
import { FiDollarSign, FiUpload } from 'react-icons/fi';

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [price, setPrice] = useState(course?.price || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(course?.imageUrl || null);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price);
      setImagePreview(course.imageUrl);
    }
  }, [course]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (image) formData.append('imageUrl', image);
    onSubmit(formData, course?.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch" bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
        <FormControl isRequired>
          <FormLabel htmlFor="title">Course Title</FormLabel>
          <Input
            id="title"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="lg"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="description">Course Description</FormLabel>
          <Box border="1px" borderColor={borderColor} borderRadius="md" overflow="hidden">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter course description"
              style={{ height: '200px' }}
            />
          </Box>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="price">Course Price</FormLabel>
          <InputGroup>
            <InputLeftAddon children={<Icon as={FiDollarSign} />} />
            <Input
              id="price"
              type="number"
              placeholder="Enter course price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="image">Course Image</FormLabel>
          <InputGroup>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <Button as="label" htmlFor="image" leftIcon={<Icon as={FiUpload} />} cursor="pointer">
              Upload Image
            </Button>
          </InputGroup>
          {imagePreview && (
            <Box mt={4}>
              <Text mb={2}>Preview:</Text>
              <Image src={imagePreview} alt="Course preview" maxHeight="200px" objectFit="cover" borderRadius="md" />
            </Box>
          )}
        </FormControl>

        <Flex justify="space-between" mt={4}>
          <Button onClick={onCancel} variant="outline">Cancel</Button>
          <Button type="submit" colorScheme="blue">Submit</Button>
        </Flex>
      </VStack>
    </form>
  );
};

export default CourseForm;