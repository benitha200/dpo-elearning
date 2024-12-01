// import React, { useState } from 'react';
// import API_URL from '../../../Constants/Const';

// const Verification = ({ userId, onVerificationSuccess }) => {
//   const [verificationCode, setVerificationCode] = useState('');
//   const [error, setError] = useState('');

//   const handleVerification = (e) => {
//     e.preventDefault();
//     setError('');

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       userId,
//       verificationCode,
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(`${API_URL}/api/auth/verifyCode`, requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         onVerificationSuccess(result.token, result.data.role);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setError('Verification failed. Please check your code and try again.');
//       });
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden p-8">
//         <h2 className="text-2xl font-bold text-center">Enter Verification Code</h2>
//         <form className="space-y-6" onSubmit={handleVerification}>
//           <div>
//             <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
//               Verification Code
//             </label>
//             <div className="mt-1">
//               <input
//                 id="verificationCode"
//                 name="verificationCode"
//                 type="text"
//                 required
//                 value={verificationCode}
//                 onChange={(e) => setVerificationCode(e.target.value)}
//                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
//             >
//               Verify Code
//             </button>
//           </div>
//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Verification;

import React, { useState } from 'react';
import API_URL from '../../../Constants/Const';

const Verification = ({ userId, onVerificationSuccess }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userId,
      verificationCode,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_URL}/api/auth/verifyCode`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        onVerificationSuccess(result.token, result.data.role);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Verification failed. Please check your code and try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-center">Enter Verification Code</h2>
        <form className="space-y-6" onSubmit={handleVerification}>
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1">
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify Code'
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Verification;