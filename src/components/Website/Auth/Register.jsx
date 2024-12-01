// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import img1 from '../../../assets/img/3.jpg';
// import API_URL from '../../../Constants/Const';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');

//     const raw = JSON.stringify({ email, firstName, lastName, password });

//     try {
//       const response = await fetch(`${API_URL}/api/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: raw,
//       });

//       if (!response.ok) {
//         throw new Error('Registration failed');
//       }

//       const result = await response.json();

//       if (result.message === "user signup successful") {
//         const emailToken = result.data.emailToken;
//         await fetch(`${API_URL}/api/auth/verify-email/${emailToken}`, {
//           method: 'GET',
//           headers: { 'accept': '*/*' },
//         });

//         alert('Registration successful! Please check your email to verify your account.');
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Registration failed. Please try again.');
//     }
//   };

//   const benefits = [
//     'Learn from industry-leading professionals',
//     'Access a wide range of specialized courses',
//     'Earn recognized certifications',
//     'Join a community of data security enthusiasts',
//     'Stay updated with the latest security trends and technologies',
//   ];

//   return (
//     <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           {/* Benefits Section */}
//           <div className="w-full md:w-1/2 bg-sky-50 p-8">
//             <h2 className="text-3xl font-bold text-sky-600 mb-6">
//               Why Join CyberAware Solution?
//             </h2>
//             <p className="text-lg text-gray-700 mb-6">
//               Embark on a journey to become a data security expert with our comprehensive courses and cutting-edge resources.
//             </p>
//             <ul className="space-y-4">
//               {benefits.map((benefit, index) => (
//                 <li key={index} className="flex items-center">
//                   <span className="text-yellow-500 mr-2 text-xl">✓</span>
//                   <span className="text-gray-700">{benefit}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Registration Form */}
//           <div className="w-full md:w-1/2">
//             <div className="relative h-48 w-full">
//               <img className="absolute inset-0 h-full w-full object-cover" src={img1} alt="Register visual" />
//               <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 opacity-75"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <h2 className="text-4xl font-extrabold text-white">Join Us</h2>
//               </div>
//             </div>
//             <div className="px-8 py-6">
//               <form className="space-y-4" onSubmit={handleRegister}>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                     First Name
//                   </label>
//                   <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     required
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                     Last Name
//                   </label>
//                   <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     required
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
//                   >
//                     Register
//                   </button>
//                 </div>
//                 {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
//               </form>
//               <div className="mt-4 text-center">
//                 <span className="text-sm text-gray-600">
//                   Already have an account?{' '}
//                   <a href="/login" className="font-medium text-sky-600 hover:text-sky-500">
//                     Sign in
//                   </a>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  useToast, 
  Spinner 
} from '@chakra-ui/react';
import img1 from '../../../assets/img/3.jpg';
import API_URL from '../../../Constants/Const';

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });
        
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
    } finally {
      setIsLoading(false);
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
              Why Join CyberAware Solution?
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
                  <Button
                    type="submit"
                    // colorScheme="sky"
                    className='bg-sky-500 hover:border-gray-300'
                    width="full"
                    isLoading={isLoading}
                    spinner={<Spinner size="md" />}
                  >
                    Register
                  </Button>
                </div>
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