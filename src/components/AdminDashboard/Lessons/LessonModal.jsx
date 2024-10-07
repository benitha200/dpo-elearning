import React from 'react';
import DOMPurify from 'dompurify';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Heading,
  Text,
  Box,
  AspectRatio
} from "@chakra-ui/react";

const LessonModal = ({ isOpen, onClose, lessonData }) => {
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const renderVideo = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('/').pop();
      return (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      );
    } else if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://player.vimeo.com/video/${videoId}`}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      );
    } else {
      return (
        <AspectRatio ratio={16 / 9}>
          <video src={url} controls>
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{lessonData?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {lessonData && (
            <VStack spacing={6} align="stretch">
              {lessonData.videoUrl && (
                <Box borderRadius="md" overflow="hidden">
                  {renderVideo(lessonData.videoUrl)}
                </Box>
              )}
              <Box>
                <Heading size="md" mb={2}>Description</Heading>
                <Box 
                  borderRadius="md" 
                  bg="gray.50" 
                  p={4}
                  dangerouslySetInnerHTML={sanitizeHTML(lessonData.content)}
                />
              </Box>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LessonModal;