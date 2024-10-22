// import React, { useState, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ArrowLeft, Upload } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import API_URL from '../../../Constants/Const';

// const AddLesson = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [video, setVideo] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const formData = new FormData();
//     formData.append('courseId', courseId);
//     formData.append('title', title);
//     formData.append('content', content);
//     if (video) {
//       formData.append('videoUrl', video);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`${API_URL}/api/lesson/create/${courseId}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         }
//       });
//       navigate(`/course/${courseId}`);
//     } catch (err) {
//       console.error('Error adding lesson:', err);
//       setError('Failed to add lesson. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVideoChange = useCallback((e) => {
//     const file = e.target.files[0];
//     setVideo(file);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <button
//           onClick={() => navigate(`/courses`)}
//           className="flex items-center text-sky-800 hover:text-sky-600 mb-6"
//         >
//           <ArrowLeft className="mr-2" size={20} />
//           Back to Course
//         </button>

//         <div className="bg-white shadow-md rounded-lg p-8">
//           <h1 className="text-3xl font-bold mb-8 text-sky-800">Add New Lesson</h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                 Lesson Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
//                 Lesson Content
//               </label>
//               <ReactQuill
//                 value={content}
//                 onChange={setContent}
//                 className="bg-white pb-8"
//                 style={{height:'20rem'}}
//                 modules={{
//                   toolbar: [
//                     [{ header: [1, 2, false] }],
//                     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                     [{ list: 'ordered' }, { list: 'bullet' }],
//                     ['link', 'image'],
//                     ['clean'],
//                   ],
//                 }}
//               />
//             </div>

//             <div>
//               <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
//                 Video Upload
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="video"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
//                     >
//                       <span>Upload a video</span>
//                       <input id="video" name="video" type="file" accept="video/*" onChange={handleVideoChange} className="sr-only" />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">MP4, WebM, or OGG up to 100MB</p>
//                 </div>
//               </div>
//             </div>

//             {error && (
//               <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-sky-800 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200"
//             >
//               {loading ? 'Adding Lesson...' : 'Add Lesson'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddLesson;

import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../../Constants/Const';

const AddLessonModal = ({ isOpen, onClose, courseId, onLessonAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('title', title);
    formData.append('content', content);
    if (video) {
      formData.append('videoUrl', video);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/lesson/create/${courseId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      onLessonAdded();
      onClose();
    } catch (err) {
      console.error('Error adding lesson:', err);
      setError('Failed to add lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoChange = useCallback((e) => {
    const file = e.target.files[0];
    setVideo(file);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="bg-white"
              style={{height: '200px'}}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </div>

          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1 mt-5">
              Video Upload
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="video"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                  >
                    <span>Upload a video</span>
                    <input id="video" name="video" type="file" accept="video/*" onChange={handleVideoChange} className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">MP4, WebM, or OGG up to 100MB</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Adding Lesson...' : 'Add Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLessonModal;