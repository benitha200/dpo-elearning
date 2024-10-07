import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Flex,
  Badge,
  Select,
  useColorModeValue,
  Spinner,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ButtonGroup,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import API_URL from '../../../Constants/Const';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/all`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUsers(data.data || []); // Ensure users is an array even if data.data is undefined
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error fetching users',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setUsers([]); // Set users to an empty array on error
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) =>
    (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === '' || user.role === roleFilter) &&
    (statusFilter === '' || (statusFilter === 'active' ? user.isActivated : !user.isActivated))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/delete/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        toast({
          title: 'User deleted',
          description: `${userToDelete.firstName} ${userToDelete.lastName} has been deleted.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error deleting user',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsDeleteAlertOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box spacing={6} p={6}>
      <Heading as="h1" size="xl" mb={6}>Users Dashboard</Heading>
      <Flex justify="space-between" align="center" mb={6}>
        <Flex align="center" maxWidth="sm" width="100%">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            mr={2}
          />
          <Button leftIcon={<SearchIcon />} colorScheme="blue">
            Search
          </Button>
        </Flex>
        <Button leftIcon={<AddIcon />} colorScheme="green">
          Add New User
        </Button>
      </Flex>
      <Flex mb={4}>
        <Select placeholder="Filter by role" value={roleFilter} onChange={handleRoleFilter} mr={4}>
          <option value="admin">Admin</option>
          <option value="user">learner</option>
        </Select>
        <Select placeholder="Filter by status" value={statusFilter} onChange={handleStatusFilter}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </Flex>
      {loading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          {users.length > 0 ? (
            <Box overflowX="auto" boxShadow="md" borderRadius="lg">
              <Table variant="simple" bg={bg} borderWidth={1} borderColor={borderColor}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentUsers.map((user) => (
                    <Tr key={user.id}>
                      <Td>{`${user.firstName} ${user.lastName}`}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        <Badge colorScheme={user.role === 'admin' ? 'purple' : 'blue'}>
                          {user.role}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme={user.isActivated ? 'green' : 'red'}>
                          {user.isActivated ? 'Active' : 'Inactive'}
                        </Badge>
                      </Td>
                      <Td>
                        <Link to={`/edit-user/${user.id}`}>
                          <Button size="sm" leftIcon={<EditIcon />} colorScheme="blue" variant="ghost" mr={2}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          leftIcon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Text mt={4} textAlign="center" color="gray.500">
              No users found.
            </Text>
          )}
        </>
      )}
      {users.length > 0 && filteredUsers.length === 0 && !loading && (
        <Text mt={4} textAlign="center" color="gray.500">
          No users found matching your search or filters.
        </Text>
      )}
      {users.length > 0 && (
        <Flex justifyContent="center" mt={4}>
          <ButtonGroup>
            <Button
              onClick={() => paginate(currentPage - 1)}
              isDisabled={currentPage === 1}
              leftIcon={<ChevronLeftIcon />}
            >
              Previous
            </Button>
            <Button
              onClick={() => paginate(currentPage + 1)}
              isDisabled={indexOfLastUser >= filteredUsers.length}
              rightIcon={<ChevronRightIcon />}
            >
              Next
            </Button>
          </ButtonGroup>
        </Flex>
      )}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={undefined}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete {userToDelete?.firstName} {userToDelete?.lastName}? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UsersPage;