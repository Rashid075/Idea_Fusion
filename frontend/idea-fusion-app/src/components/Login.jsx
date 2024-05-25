import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.post(
        "https://idea-fusion-61pe.onrender.com/api/auth/login",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const { token, ...userInfo } = response.data;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", token);
      document.cookie = `jwt=${token}; path=/;`;
      toast.success("Logged in successfully");
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-5 flex flex-col items-center justify-center px-5 sm:px-0">
      <header className="max-w-sm lg:max-w-2xl w-full py-4 bg-gray-800 text-white text-center shadow-md rounded-lg animate-fadeIn">
        <h1 className="text-3xl font-bold">Welcome to Idea Fusion</h1>
      </header>
      <div className="flex justify-center items-center bg-gray-800 rounded-lg shadow-lg max-w-sm lg:max-w-2xl w-full mt-2 p-8 animate-slideInUp">
        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="text-xl xl:text-4xl font-bold text-white">Welcome Back</h1>
            <p className="text-xs text-gray-300 pt-2">Please enter your details to Login</p>
          </div>
          <form onSubmit={submitHandler} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Email Address</label>
              <input
                className="text-gray-100 rounded py-2 px-4 block w-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition duration-300 ease-in-out"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
              <input
                className="text-gray-100 rounded py-2 px-4 block w-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition duration-300 ease-in-out"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-orange-600 text-gray-100 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
              <span className="ml-3">Login</span>
            </button>
            <div className="text-xs text-gray-200 text-center mt-4">
              Don&apos;t have an account yet?{" "}
              <Link to="/" className="text-blue-500">
                Sign Up
              </Link>
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
    </div>
  );
};

export default Login;
