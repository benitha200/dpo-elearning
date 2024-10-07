import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { VStack, Input, Button, Image as ChakraImage } from "@chakra-ui/react";

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [price, setPrice] = useState(course?.price || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(course?.imageUrl || null);

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
      <VStack spacing={4}>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="Description"
          className='w-full' style={{height: '40rem'}}
        />
        <Input placeholder="Price" className='mt-10' value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <ChakraImage src={imagePreview} alt="Course preview" maxHeight="200px" objectFit="cover" />
        )}
        <Button type="submit" colorScheme="blue">Submit</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </VStack>
    </form>
  );
};

export default CourseForm;