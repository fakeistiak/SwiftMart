"use client";
import React, { useState } from 'react';
import { motion } from "motion/react";
import { FaUser, FaEnvelope, FaLock, FaArrowRightLong } from 'react-icons/fa6';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-slate-50/50">
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
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-secondary transition-all duration-200 group cursor-pointer"
            >
              Sign Up
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                <FaArrowRightLong />
              </span>
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}

export default RegisterForm;