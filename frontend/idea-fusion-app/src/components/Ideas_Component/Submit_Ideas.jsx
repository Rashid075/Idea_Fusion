import React, { useState } from "react";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const Submit_Ideas = () => {
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [tech, setTech] = useState("");
  const [description, setDescription] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !domain || !tech || !description || !linkedin) {
      toast.error("Please fill all the fields");
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to submit");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/ideas", {
        title: title,
        domain: domain,
        technologies: tech,
        description: description,
        linkedin: linkedin,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Idea Submitted");
        // Clear form fields after successful submission
        setTitle("");
        setDomain("");
        setTech("");
        setDescription("");
        setLinkedin("");
      } else {
        toast.error("Failed to submit idea");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error submitting idea:", error.response.data);
        toast.error(error.response.data.error || "Failed to submit");
      } else if (error.request) {
        console.error("Error submitting idea:", error.request);
        toast.error("Failed to submit");
      } else {
        console.error("Error submitting idea:", error.message);
        toast.error("Failed to submit");
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full h-[110vh] bg-gradient-to-br from-black via-gray-900 to-gray-800 px-5 pt-8">
        <div className="xl:max-w-3xl w-full p-5 sm:p-10 rounded-md bg-gradient-to-b from-black via-gray-900 to-gray-800 border border-gray-700 shadow-lg animate-fadeIn">
          <h1 className="text-center text-xl sm:text-3xl font-semibold text-white mb-8 animate-slideInUp">Share Your Innovative Idea</h1>
          <form onSubmit={handleSubmit} className="w-full mt-8">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline animate-slideInUp"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline animate-slideInUp"
                type="text"
                placeholder="Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline animate-slideInUp"
                type="text"
                placeholder="Tech Stack"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
              />
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline animate-slideInUp"
                type="url"
                placeholder="Your LinkedIn Profile"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
              <textarea
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline animate-slideInUp"
                placeholder="Description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none animate-slideInUp"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Publish</span>
              </button>
            </div>
          </form>
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
    </>
  );
};

export default Submit_Ideas;
