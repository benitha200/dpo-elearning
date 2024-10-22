import React, { useState, useEffect } from 'react';
import { Award, Download, ExternalLink, Clock, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import API_URL from '../../Constants/Const';

const CertificateCard = ({ certificate }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={certificate.course?.imageUrl || `/api/placeholder/400/320`} alt={certificate.course?.title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{certificate.course?.title}</h3>
      <p className="text-sm text-gray-600 mb-2">Issued on: {new Date(certificate.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-green-600 mb-4">Status: Completed</p>
      <div className="flex justify-between">
        <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm p-2">
          <Download size={16} className="mr-1" /> Download
        </button>
      </div>
    </div>
  </div>
);

const EnrolledCourseCard = ({ course, onContinue }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-lg">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 lg:w-1/4">
        <img 
          src={course.course?.imageUrl || `/api/placeholder/400/320`} 
          alt={course.course?.title} 
          className="w-full h-48 md:h-full object-cover"
        />
      </div>
      <div className="flex-1 p-6">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{course.course?.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.completionDate 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {course.completionDate ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>{course.progress || 0}% Complete</span>
              </div>
            </div>
            <p 
              className="text-gray-600 line-clamp-2 mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(course.course?.description || '')
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              colorScheme="blue"
              onClick={() => onContinue(course.course?.id)}
              size="lg"
              className="flex items-center space-x-2"
            >
              <span>Continue Learning</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Certificates = () => {
  const [certificatesData, setCertificatesData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch certificates
        const certificatesResponse = await fetch(`${API_URL}/api/certificate/byUser`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Fetch enrolled courses
        const enrolledResponse = await fetch(`${API_URL}/api/enroll/byUser`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!certificatesResponse.ok || !enrolledResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const certificatesData = await certificatesResponse.json();
        const enrolledData = await enrolledResponse.json();

        setCertificatesData(certificatesData.data || []);
        setEnrolledCourses(enrolledData.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter out courses that already have certificates
  const filteredEnrolledCourses = enrolledCourses.filter(enrolledCourse => 
    !certificatesData.some(cert => cert.course?.id === enrolledCourse.course?.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                <p className="text-lg font-semibold text-green-800">
                  {certificatesData.length > 0 ? certificatesData[0].course?.title : 'N/A'}
                </p>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4 flex items-center">
              <ExternalLink className="text-purple-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-purple-600">In Progress Courses</p>
                <p className="text-2xl font-bold text-purple-800">{filteredEnrolledCourses.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">In Progress Courses</h2>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {filteredEnrolledCourses.length} Course{filteredEnrolledCourses.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {filteredEnrolledCourses.length > 0 ? (
            <div className="space-y-6">
              {filteredEnrolledCourses.map((course) => (
                <EnrolledCourseCard
                  key={course.id}
                  course={course}
                  onContinue={(courseId) => navigate(`/course/${courseId}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-2">No courses in progress</p>
              <p className="text-gray-500 mb-6">Start your learning journey today!</p>
              <Button
                colorScheme="blue"
                onClick={() => navigate('/courses')}
                size="lg"
              >
                Browse Courses
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;