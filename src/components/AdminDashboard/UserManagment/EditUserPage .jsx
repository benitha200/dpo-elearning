import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack,
  Switch,
  Select,
} from '@chakra-ui/react';
import API_URL from '../../../Constants/Const';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    isActivated: false,
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/single/${id}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      toast({
        title: 'Error fetching user',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setUser({ ...user, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/user/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast({
          title: 'User updated',
          description: 'User information has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/users');
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error updating user',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" mt={8}>
      <Heading as="h1" size="xl" mb={6}>Edit User</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={user.email}
              onChange={handleInputChange}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={user.role}
              onChange={handleInputChange}
            >
              <option value="learner">Learner</option>
              <option value="instructor">Admin</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="isActivated" mb="0">
              Activated
            </FormLabel>
            <Switch
              id="isActivated"
              name="isActivated"
              isChecked={user.isActivated}
              onChange={handleSwitchChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Update User
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditUserPage;