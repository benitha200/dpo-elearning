import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  AspectRatio,
  useToast
} from "@chakra-ui/react";

const LessonEditModal = ({ isOpen, onClose, editingLesson, setEditingLesson, loading, setLoading }) => {
  const [localLesson, setLocalLesson] = useState(editingLesson);
  const toast = useToast();

  useEffect(() => {
    setLocalLesson(editingLesson);
  }, [editingLesson]);

  const handleInputChange = (field, value) => {
    setLocalLesson(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/lesson/update/${localLesson.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localLesson),
      });

      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }

      const updatedLesson = await response.json();
      setEditingLesson(updatedLesson);
      toast({
        title: "Lesson updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast({
        title: "Error updating lesson",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Lesson</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {localLesson && (
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={localLesson.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Video URL</FormLabel>
                <Input
                  value={localLesson.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                />
              </FormControl>
              {localLesson.videoUrl && (
                <FormControl>
                  <FormLabel>Video Preview</FormLabel>
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      title="Lesson Video"
                      src={localLesson.videoUrl}
                      allowFullScreen
                    />
                  </AspectRatio>
                </FormControl>
              )}
              <FormControl>
                <FormLabel>Content</FormLabel>
                <ReactQuill
                  value={localLesson.content}
                  onChange={(content) => handleInputChange('content', content)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean'],
                    ],
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Content Preview</FormLabel>
                <Box
                  borderWidth={1}
                  borderRadius="md"
                  p={2}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(localLesson.content)
                  }}
                />
              </FormControl>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveEdit} isLoading={loading}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LessonEditModal;