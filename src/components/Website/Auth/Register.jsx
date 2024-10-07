// import React, { useState } from 'react';
// import img1 from '../../../assets/img/3.jpg';
// import API_URL from './../../../Constants/Const.jsx'; // Ensure this points to the correct API_URL

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     console.log("button clicked");
//     console.log(`${email} ${firstName} ${lastName} ${password}`);

//     const raw = {
//       email,
//       firstName,
//       lastName,
//       password,
//     };

//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(raw),
//     };

//     fetch(`${API_URL}/api/auth/signup`, requestOptions)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//       })
//       .then(result => {
//         console.log(result);

//         // Check if signup was successful and send email verification
//         if (result.message === "user signup successful") {
//           const emailToken = result.data.emailToken;

//           // Send the emailToken to verify the email
//           fetch(`${API_URL}/api/auth/verify-email/${emailToken}`, {
//             method: 'GET',
//             headers: {
//               'accept': '*/*',
//             }
//           })
//             .then(verifyResponse => {
//               if (!verifyResponse.ok) {
//                 throw new Error('Verification response was not ok ' + verifyResponse.statusText);
//               }
//               return verifyResponse.json();
//             })
//             .then(verifyResult => {
//               console.log('Email verification result:', verifyResult);
//               // Handle successful email verification (e.g., show a message to the user)
//             })
//             .catch(error => console.error('Error during email verification:', error));
//         }
//       })
//       .catch(error => console.error('Error during signup:', error));
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden">
//         <div className="relative h-64 w-full">
//           <img className="absolute inset-0 h-full w-full object-cover" src={img1} alt="Registration visual" />
//           <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 opacity-75"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <h2 className="text-4xl font-extrabold text-white">Welcome</h2>
//           </div>
//         </div>
//         <div className="px-8 py-6">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="Email"
//                   name="Email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="FirstName"
//                   name="FirstName"
//                   type="text"
//                   required
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="LastName"
//                   name="LastName"
//                   type="text"
//                   required
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   Text,
//   useColorModeValue,
//   VStack,
//   Image,
//   useToast,
// } from '@chakra-ui/react';
// import { FaUserPlus } from 'react-icons/fa';
// import API_URL from '../../../Constants/Const';
// import img1 from '../../../assets/img/3.jpg';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const raw = { email, firstName, lastName, password };

//     try {
//       const response = await fetch(`${API_URL}/api/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(raw),
//       });

//       if (!response.ok) {
//         throw new Error('Signup failed');
//       }

//       const result = await response.json();

//       if (result.message === "user signup successful") {
//         const emailToken = result.data.emailToken;
//         await fetch(`${API_URL}/api/auth/verify-email/${emailToken}`, {
//           method: 'GET',
//           headers: { 'accept': '*/*' },
//         });

//         toast({
//           title: 'Registration Successful',
//           description: 'Please check your email to verify your account.',
//           status: 'success',
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error('Error during signup:', error);
//       toast({
//         title: 'Registration Failed',
//         description: 'An error occurred during registration. Please try again.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const bgColor = useColorModeValue('gray.50', 'gray.800');
//   const cardBg = useColorModeValue('white', 'gray.700');

//   return (
//     <Box minH="100vh" bg={bgColor}>
//       <Container maxW="container.xl" py={20}>
//         <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center">
//           <Box
//             flex={1}
//             bg={cardBg}
//             p={8}
//             borderRadius="lg"
//             boxShadow="xl"
//             maxW="500px"
//             width="100%"
//           >
//             <VStack spacing={8} align="stretch">
//               <Heading as="h1" size="xl" textAlign="center" color="blue.600">
//                 Join Data Security Hub
//               </Heading>
//               <Image
//                 src={img1}
//                 alt="Registration visual"
//                 borderRadius="md"
//                 objectFit="cover"
//                 height="200px"
//               />
//               <form onSubmit={handleSubmit}>
//                 <Stack spacing={4}>
//                   <FormControl isRequired>
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                     />
//                   </FormControl>
//                   <FormControl isRequired>
//                     <FormLabel>First Name</FormLabel>
//                     <Input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       placeholder="Enter your first name"
//                     />
//                   </FormControl>
//                   <FormControl isRequired>
//                     <FormLabel>Last Name</FormLabel>
//                     <Input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Enter your last name"
//                     />
//                   </FormControl>
//                   <FormControl isRequired>
//                     <FormLabel>Password</FormLabel>
//                     <Input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Create a password"
//                     />
//                   </FormControl>
//                   <Button
//                     type="submit"
//                     colorScheme="blue"
//                     size="lg"
//                     fontSize="md"
//                     leftIcon={<FaUserPlus />}
//                   >
//                     Register
//                   </Button>
//                 </Stack>
//               </form>
//             </VStack>
//           </Box>
//           <Box flex={1} pl={{ base: 0, md: 12 }} mt={{ base: 12, md: 0 }}>
//             <VStack spacing={6} align="start">
//               <Heading as="h2" size="xl" color="blue.600">
//                 Why Join Data Security Hub?
//               </Heading>
//               <Text fontSize="lg">
//                 Embark on a journey to become a data security expert with our comprehensive courses and cutting-edge resources.
//               </Text>
//               <VStack align="start" spacing={4}>
//                 {[
//                   'Learn from industry-leading professionals',
//                   'Access a wide range of specialized courses',
//                   'Earn recognized certifications',
//                   'Join a community of data security enthusiasts',
//                   'Stay updated with the latest security trends and technologies',
//                 ].map((benefit, index) => (
//                   <Flex key={index} align="center">
//                     <Box as="span" color="green.500" fontSize="lg" mr={2}>
//                       ✓
//                     </Box>
//                     <Text fontSize="md">{benefit}</Text>
//                   </Flex>
//                 ))}
//               </VStack>
//             </VStack>
//           </Box>
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../assets/img/3.jpg';
import API_URL from '../../../Constants/Const';

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const raw = JSON.stringify({ email, firstName, lastName, password });

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();

      if (result.message === "user signup successful") {
        const emailToken = result.data.emailToken;
        await fetch(`${API_URL}/api/auth/verify-email/${emailToken}`, {
          method: 'GET',
          headers: { 'accept': '*/*' },
        });

        alert('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  const benefits = [
    'Learn from industry-leading professionals',
    'Access a wide range of specialized courses',
    'Earn recognized certifications',
    'Join a community of data security enthusiasts',
    'Stay updated with the latest security trends and technologies',
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Benefits Section */}
          <div className="w-full md:w-1/2 bg-sky-50 p-8">
            <h2 className="text-3xl font-bold text-sky-600 mb-6">
              Why Join Data Security Hub?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Embark on a journey to become a data security expert with our comprehensive courses and cutting-edge resources.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-yellow-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Registration Form */}
          <div className="w-full md:w-1/2">
            <div className="relative h-48 w-full">
              <img className="absolute inset-0 h-full w-full object-cover" src={img1} alt="Register visual" />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 opacity-75"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl font-extrabold text-white">Join Us</h2>
              </div>
            </div>
            <div className="px-8 py-6">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Register
                  </button>
                </div>
                {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
              </form>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-sky-600 hover:text-sky-500">
                    Sign in
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;