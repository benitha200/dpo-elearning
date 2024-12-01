import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text
} from '@chakra-ui/react';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  courseTitle, 
  coursePrice, 
  onSubmitPayment 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const toast = useToast();

  const handleSubmit = () => {
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Call the payment submission handler passed from parent
    onSubmitPayment({
      phoneNumber,
      paymentMethod
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Enroll in {courseTitle}
          <Text fontSize="sm" color="gray.500" fontWeight="normal">
            Course Price: ${coursePrice}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input 
                type="tel" 
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="[0-9]*"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Payment Method</FormLabel>
              <Button 
                variant={paymentMethod === 'momo' ? 'solid' : 'outline'}
                colorScheme="blue"
                onClick={() => setPaymentMethod('momo')}
                width="100%"
              >
                Mobile Money (MoMo)
              </Button>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleSubmit}
          >
            Pay Now
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;