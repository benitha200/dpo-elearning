import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Select,
  Progress,
} from "@chakra-ui/react";
import { StarIcon } from 'lucide-react';

const ReviewCard = ({ author, date, rating, content }) => (
  <Box borderWidth={1} borderRadius="lg" p={4} mb={4}>
    <HStack spacing={4} mb={2}>
      <Avatar name={author} />
      <VStack align="start" spacing={0}>
        <Text fontWeight="bold">{author}</Text>
        <Text fontSize="sm" color="gray.500">{date}</Text>
      </VStack>
    </HStack>
    <HStack spacing={1} mb={2}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} color={i < rating ? "yellow.400" : "gray.300"} />
      ))}
    </HStack>
    <Text>{content}</Text>
  </Box>
);

const RatingBreakdown = ({ ratings }) => (
  <VStack align="stretch" spacing={2}>
    {[5, 4, 3, 2, 1].map((stars) => (
      <HStack key={stars} spacing={4}>
        <Text width="60px">{stars} stars</Text>
        <Progress value={ratings[stars]} flex={1} size="sm" colorScheme="yellow" />
        <Text width="40px">{ratings[stars]}%</Text>
      </HStack>
    ))}
  </VStack>
);

const ReviewsPage = () => {
  const reviews = [
    { author: "John Doe", date: "2023-09-14", rating: 5, content: "Excellent course on GDPR fundamentals. Very informative and well-structured." },
    { author: "Jane Smith", date: "2023-09-13", rating: 4, content: "Great content, but could use more practical examples." },
    { author: "Alice Johnson", date: "2023-09-12", rating: 5, content: "The instructor's expertise really shines through. Highly recommended!" },
  ];

  const ratingBreakdown = {
    5: 70,
    4: 20,
    3: 5,
    2: 3,
    1: 2,
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Course Reviews</Heading>
        <HStack spacing={4}>
          <Select placeholder="Select course">
            <option value="gdpr-fundamentals">GDPR Fundamentals</option>
            <option value="data-protection-impact-assessments">Data Protection Impact Assessments</option>
            <option value="intro-to-data-protection">Introduction to Data Protection</option>
          </Select>
          <Button colorScheme="blue">Filter</Button>
        </HStack>
        <HStack align="start" spacing={8}>
          <VStack flex={2} align="stretch">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </VStack>
          <Box flex={1}>
            <Heading as="h2" size="md" mb={4}>Rating Breakdown</Heading>
            <RatingBreakdown ratings={ratingBreakdown} />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ReviewsPage;