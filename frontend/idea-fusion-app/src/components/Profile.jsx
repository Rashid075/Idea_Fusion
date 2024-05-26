import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view profile');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = response.data;
        setUser(userData);
        setLinkedin(userData.linkedin || '');
        setGithub(userData.github || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to update profile');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/auth/profile', {
        linkedin,
        github,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 animate-fadeIn">
      <div className="w-full max-w-md bg-gradient-to-br from-black via-gray-800 to-gray-700 shadow-lg rounded-lg p-6 text-white animate-slideInUp">
        <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>
        <p className="mb-4"><strong>Name:</strong> {user.Name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.Email}</p>
        <p className="mb-4"><strong>Phone Number:</strong> {user.Phone}</p>
        <div className="mb-4">
          <strong>LinkedIn:</strong>
          <input 
            type="text" 
            value={linkedin} 
            onChange={(e) => setLinkedin(e.target.value)} 
            className="bg-gray-700 p-2 rounded w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <strong>GitHub:</strong>
          <input 
            type="text" 
            value={github} 
            onChange={(e) => setGithub(e.target.value)} 
            className="bg-gray-700 p-2 rounded w-full mt-1"
          />
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full transition-transform transform hover:scale-110">
              <FaLinkedinIn size={24} className="text-white group-hover:text-blue-600" />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full transition-transform transform hover:scale-110">
              <FaGithub size={24} className="text-white group-hover:text-gray-600" />
            </a>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleUpdateProfile}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-transform transform hover:scale-105"
          >
            Update Profile
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;
