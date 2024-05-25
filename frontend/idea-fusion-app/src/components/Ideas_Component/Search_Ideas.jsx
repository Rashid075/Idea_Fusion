import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import IdeaModal from './IdeaModal';

const SearchIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeas = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view ideas');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/ideas?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIdeas(response.data.ideas);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching ideas:', error);
        toast.error('Failed to fetch ideas');
      }
    };

    fetchIdeas();
  }, [page, limit]);

  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/ideas/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Update ideas list
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea._id === id ? { ...idea, likes: idea.likes + (idea.likedByUser ? -1 : 1), likedByUser: !idea.likedByUser, dislikedByUser: false } : idea
        )
      );
    } catch (error) {
      console.error('Error liking idea:', error);
      toast.error('Failed to like idea');
    }
  };

  const handleDislike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/ideas/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Update ideas list
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea._id === id ? { ...idea, dislikes: idea.dislikes + (idea.dislikedByUser ? -1 : 1), dislikedByUser: !idea.dislikedByUser, likedByUser: false } : idea
        )
      );
    } catch (error) {
      console.error('Error disliking idea:', error);
      toast.error('Failed to dislike idea');
    }
  };

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedIdea(null);
    }, 300); // Ensure the modal is fully closed before setting selectedIdea to null
  };

  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.technologies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full h-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-5 animate-fadeIn">
        <div className="w-full max-w-3xl bg-gradient-to-br from-black via-gray-900 to-gray-700 shadow-lg rounded-lg p-6 border border-gray-900 animate-slideInUp">
          <h1 className="text-4xl font-bold text-center text-white mb-8">Explore Innovative Ideas</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white border border-gray-900 rounded-lg mb-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="space-y-6">
            {filteredIdeas.map((idea) => (
              <div
                key={idea._id}
                className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-900 transition-transform transform hover:scale-105 duration-300 animate-slideInUp"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-orange-400">{idea.title}</h2>
                  <button
                    onClick={() => handleIdeaClick(idea)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300"
                  >
                    View
                  </button>
                </div>
                <p className="text-gray-300 mb-2">
                  <strong>Domain:</strong> {idea.domain}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Technologies:</strong> {idea.technologies}
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Description:</strong> {idea.description}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(idea._id); }}
                    className={`flex items-center space-x-1 ${idea.likedByUser ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
                  >
                    <FaThumbsUp size={20} />
                    <span>{idea.likes}</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDislike(idea._id); }}
                    className={`flex items-center space-x-1 ${idea.dislikedByUser ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
                  >
                    <FaThumbsDown size={20} />
                    <span>{idea.dislikes}</span>
                  </button>
                </div>
              </div>
            ))}
            {filteredIdeas.length === 0 && <p className="text-center text-gray-500">No ideas found</p>}
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 disabled:bg-orange-300"
            >
              Previous
            </button>
            <span className="text-gray-300">Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 disabled:bg-orange-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {selectedIdea && (
        <div className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}>
          <IdeaModal
            idea={selectedIdea}
            onClose={handleModalClose}
            onLike={() => handleLike(selectedIdea._id)}
            onDislike={() => handleDislike(selectedIdea._id)}
          />
        </div>
      )}
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
    </>
  );
};

export default SearchIdeas;
