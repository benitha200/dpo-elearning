import React from 'react';
import { Award, Download, ExternalLink, Clock } from 'lucide-react';
import img1 from './../../assets/img/2.jpg';
import img3 from './../../assets/img/3.jpg';
import img4 from './../../assets/img/12.jpg';

const certificatesData = [
  { 
    id: 1, 
    name: 'Web Development Fundamentals', 
    issueDate: '2024-08-15', 
    provider: 'DPO E-Learning',
    image: img1
  },
  { 
    id: 2, 
    name: 'Data Science Essentials', 
    issueDate: '2024-07-22', 
    provider: 'DPO E-Learning',
    image: img3
  },
  { 
    id: 3, 
    name: 'UX Design Principles', 
    issueDate: '2024-06-30', 
    provider: 'DPO E-Learning',
    image: img4
  },
];

const upcomingCertificates = [
  { name: 'Mobile App Development', estimatedCompletion: '2 weeks' },
  { name: 'Advanced Python Programming', estimatedCompletion: '1 month' },
];

const CertificateCard = ({ certificate }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={certificate.image} alt={certificate.name} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{certificate.name}</h3>
      <p className="text-sm text-gray-600 mb-2">Issued on: {certificate.issueDate}</p>
      <p className="text-sm text-gray-600 mb-4">Provider: {certificate.provider}</p>
      <div className="flex justify-between">
        <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
          <Download size={16} className="mr-1" /> Download
        </button>
        <button className="flex items-center text-green-600 hover:text-green-800 text-sm">
          <ExternalLink size={16} className="mr-1" /> Verify
        </button>
      </div>
    </div>
  </div>
);

const Certificates = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Certificates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {certificatesData.map(certificate => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Certificates Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 rounded-lg p-4 flex items-center">
              <Award className="text-blue-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-blue-600">Total Certificates</p>
                <p className="text-2xl font-bold text-blue-800">{certificatesData.length}</p>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 flex items-center">
              <Clock className="text-green-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-green-600">Latest Certificate</p>
                <p className="text-lg font-semibold text-green-800">{certificatesData[0].name}</p>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4 flex items-center">
              <ExternalLink className="text-purple-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-purple-600">Upcoming Certificates</p>
                <p className="text-2xl font-bold text-purple-800">{upcomingCertificates.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Certifications</h2>
          <ul className="space-y-4">
            {upcomingCertificates.map((cert, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-600">Estimated completion: {cert.estimatedCompletion}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Continue Course
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Certificates;