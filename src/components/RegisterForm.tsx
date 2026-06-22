"use client";
import React, { useState } from 'react';
import { motion } from "motion/react";
import { FaUser, FaEnvelope, FaLock, FaArrowRightLong, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";

type propType = {
  previousStep?: (s: number) => void
}

function RegisterForm({ previousStep }: propType) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // State to manage password text visibility
  const [showPassword, setShowPassword] = useState(false);

  // Form validation logic checking for complete values and proper email format
  const isFormValid = 
    formData.name.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.email.includes('@') && 
    formData.password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-slate-50/50 relative">
      
      {previousStep && (
        <button
          onClick={() => previousStep(1)} 
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-all duration-200 group cursor-pointer"
        >
          <FaArrowLeft className="text-base group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back</span>
        </button>
      )}

      <div className="max-w-md w-full">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            SwiftMart
          </h1>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            SignUp to Get Started
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Join us to get your essentials delivered in minutes
          </p>
        </div>

        {/* Form Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FaUser className="text-xs text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Email Address Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FaEnvelope className="text-xs text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FaLock className="text-xs text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 bg-slate-50/50"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-150 z-20 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Dynamic Validation Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full mt-2 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-200 group ${
                isFormValid
                  ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-secondary cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Sign Up
              <span className={`ml-2 transition-transform duration-200 ${isFormValid ? "group-hover:translate-x-1" : ""}`}>
                <FaArrowRightLong />
              </span>
            </button>

            {/* Google Authentication Button */}
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 cursor-pointer"
            >
              <FcGoogle className="text-base" />
              <span>Sign in with Google</span>
            </button>

            {/* Footer Sign In Redirection Text */}
            <div className="text-center pt-2 text-sm text-slate-500">
              Already have an account?{' '}
              <span 
                onClick={() => console.log("Navigate to sign in")} // Add routing logic if needed
                className="text-primary font-semibold hover:text-secondary transition-colors duration-150 cursor-pointer"
              >
                Sign In
              </span>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}

export default RegisterForm;