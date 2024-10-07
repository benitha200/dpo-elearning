import React, { useState } from 'react';
import img1 from '../../../assets/img/3.jpg';
import API_URL from './../../../Constants/Const.jsx'; // Ensure this points to the correct API_URL

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log("button clicked");
    console.log(`${email} ${firstName} ${lastName} ${password}`);

    const raw = {
      email,
      firstName,
      lastName,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
    };

    fetch(`${API_URL}/api/auth/signup`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(result => {
        console.log(result);

        // Check if signup was successful and send email verification
        if (result.message === "user signup successful") {
          const emailToken = result.data.emailToken;

          // Send the emailToken to verify the email
          fetch(`${API_URL}/api/auth/verify-email/${emailToken}`, {
            method: 'GET',
            headers: {
              'accept': '*/*',
            }
          })
            .then(verifyResponse => {
              if (!verifyResponse.ok) {
                throw new Error('Verification response was not ok ' + verifyResponse.statusText);
              }
              return verifyResponse.json();
            })
            .then(verifyResult => {
              console.log('Email verification result:', verifyResult);
              // Handle successful email verification (e.g., show a message to the user)
            })
            .catch(error => console.error('Error during email verification:', error));
        }
      })
      .catch(error => console.error('Error during signup:', error));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="relative h-64 w-full">
          <img className="absolute inset-0 h-full w-full object-cover" src={img1} alt="Registration visual" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-extrabold text-white">Welcome</h2>
          </div>
        </div>
        <div className="px-8 py-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="Email"
                  name="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="LastName"
                  name="LastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
