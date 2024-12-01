import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../assets/img/3.jpg';
import Verification from './Verification';
import API_URL from '../../../Constants/Const';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email, password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_URL}/api/auth/signin`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        setUserId(result.userId);
        setShowVerification(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Login failed. Please check your credentials and try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleVerificationSuccess = (token, role) => {
    onLogin(token, role);
    navigate('/');
  };

  if (showVerification) {
    return <Verification userId={userId} onVerificationSuccess={handleVerificationSuccess} />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="relative h-64 w-full">
          <img className="absolute inset-0 h-full w-full object-cover" src={img1} alt="Login visual" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-extrabold text-white">Welcome Back</h2>
          </div>
        </div>
        <div className="px-8 py-6">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg 
                      className="animate-spin h-5 w-5 mr-3 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          </form>
          <div>
            <div className="flex items-center justify-center mt-4">
              <span className="text-sm font-medium text-gray-700 pr-2">
                Don't have an account?{' '}
              </span>
              <a
                href="/register"
                className="text-sky-600 hover:text-sky-700 transition duration-150"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;