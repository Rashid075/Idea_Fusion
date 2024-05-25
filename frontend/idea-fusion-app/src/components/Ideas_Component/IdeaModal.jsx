import React, { useEffect } from 'react';
import { FaLinkedin, FaThumbsUp, FaThumbsDown, FaTimes } from 'react-icons/fa';

const IdeaModal = ({ idea, onClose, onLike, onDislike }) => {
  if (!idea) return null;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-opacity-0 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gradient-to-br from-black via-gray-800 to-gray-700 rounded-lg overflow-hidden shadow-xl w-full max-w-3xl mx-4 transform transition-transform duration-300 opacity-100">
        <div className="p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-opacity duration-300"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-3xl font-bold text-orange-400 mb-4">{idea.title}</h2>
          <p className="text-gray-300 mb-2">
            <strong>Domain:</strong> {idea.domain}
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Technologies:</strong> {idea.technologies}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Description:</strong> {idea.description}
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={onLike}
              className={`flex items-center space-x-1 ${idea.likedByUser ? 'text-green-400' : 'text-gray-400 hover:text-green-400 transition-colors duration-300'}`}
            >
              <FaThumbsUp size={20} />
              <span>{idea.likes}</span>
            </button>
            <button
              onClick={onDislike}
              className={`flex items-center space-x-1 ${idea.dislikedByUser ? 'text-red-400' : 'text-gray-400 hover:text-red-400 transition-colors duration-300'}`}
            >
              <FaThumbsDown size={20} />
              <span>{idea.dislikes}</span>
            </button>
          </div>
          <div className="flex justify-center">
            <a
              href={idea.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
              <span>Contact on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaModal;
