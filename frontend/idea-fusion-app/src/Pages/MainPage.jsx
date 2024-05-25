import React from 'react';
import Navbar from '../components/Navbar';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full h-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white animate-fadeIn">
        <div className="w-full max-w-5xl p-6 animate-slideInUp">
          <section className="text-center my-10">
            <h1 className="text-5xl font-bold mb-4">Welcome to IdeaFusion</h1>
            <p className="text-xl mb-6">
              A platform where you can share your innovative ideas, collaborate with like-minded people, and bring your visions to life!
            </p>
            <img 
              src="https://insbright.com/wp-content/uploads/962/ideas-quote-image.jpg" 
              alt="Idea Sharing" 
              className="w-full h-90 object-cover mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300" 
            />
          </section>

          <section className="my-10">
            <h2 className="text-3xl font-bold mb-5 text-center">Why Choose IdeaShare?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">Connect with Innovators</h3>
                <p>Meet and collaborate with like-minded individuals to turn your ideas into reality.</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">Share Your Vision</h3>
                <p>Share your ideas with a community that values creativity and innovation.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">Get Inspired</h3>
                <p>Explore a variety of ideas and projects to spark your own creativity.</p>
              </div>
            </div>
            <img 
              src="https://media.istockphoto.com/id/639820888/vector/seminar.jpg?s=612x612&w=0&k=20&c=JFHlkJn2XfZC01zllLaU6VKrrd9Hw-0JjAhJ6eVWRv0=" 
              alt="Innovation" 
              className="w-full h-90 object-cover mx-auto mt-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300" 
            />
          </section>

          <section className="my-10">
            <h2 className="text-3xl font-bold mb-5 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">1. Sign Up</h3>
                <p>Create your profile and become a part of our innovative community.</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">2. Share Ideas</h3>
                <p>Share your ideas with the community and get valuable feedback.</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">3. Collaborate</h3>
                <p>Engage with other innovators and start collaborating on projects.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">4. Realize Ideas</h3>
                <p>Turn your ideas into reality with the support of our community.</p>
              </div>
            </div>
            <img 
              src="https://www.ntnphotonics.ch/wp-content/uploads/2021/05/Grafik-Innovation-Booster-Process.svg" 
              alt="Process" 
              className="w-full h-90 object-cover mx-auto mt-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300" 
            />
          </section>
        </div>
      </div>

      <footer className="w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-400 py-6">
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-bold mb-2">Follow us</h4>
          <div className="flex space-x-6 mb-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaTwitter size={24} />
            </a>
          </div>
          <p>&copy; 2024 IdeaFusion. All rights reserved.</p>
        </div>
      </footer>

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

export default Home;
