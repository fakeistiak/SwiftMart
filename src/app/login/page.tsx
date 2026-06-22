"use client";
import React, { useState } from 'react';
import { motion } from "motion/react";
import { 
  FaEnvelope, 
  FaLock, 
  FaArrowRightLong, 
  FaArrowLeft, 
  FaEye, 
  FaEyeSlash,
  FaSpinner 
} from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

type propType = {
  nextStep?: (s: number) => void 
}

function LoginForm({ nextStep }: propType) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();
  console.log(session);
  const isFormValid = 
    formData.email.trim() !== '' && 
    formData.email.includes('@') && 
    formData.password.length >= 6;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isLoading) {
      console.log("Form is incomplete or already submitting:", formData);
      return;
    }

    try {
      setIsLoading(true);
      console.log("Login data:", formData);
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Login error:", result.error);
        return;
      }

      await update();
      router.push("/");
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-slate-50/50 relative">
      
      {nextStep && (
        <button
          type="button"
          disabled={isLoading}
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-all duration-200 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaArrowLeft className="text-base group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Register</span>
        </button>
      )}

      <div className="max-w-md w-full">
        
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold tracking-tight text-black py-2">
            Welcome Back
          </h2>
          <p className="text-2xl text-black tracking-tight mb-2">
            Sign in to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">SwiftMart</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          <form onSubmit={handleLogin} className="space-y-5 text-left">

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
                  disabled={isLoading}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 bg-slate-50/50 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <span 
                  onClick={() => !isLoading && console.log("Navigate to forgot password")}
                  className={`text-xs font-medium text-primary transition-colors duration-150 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-secondary cursor-pointer'}`}
                >
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FaLock className="text-xs text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 bg-slate-50/50 disabled:opacity-60"
                />
                
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-150 z-20 cursor-pointer disabled:opacity-50"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full mt-2 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-200 group ${
                isFormValid && !isLoading
                  ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-secondary cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isLoading ? (
                <>
                  <span>Signing In...</span>
                  <span className="ml-2 animate-spin">
                    <FaSpinner className="text-base" />
                  </span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                    <FaArrowRightLong />
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-base" />
              <span>Sign in with Google</span>
            </button>

            <div className="text-center pt-2 text-sm text-slate-500">
              Don't have an account?{" "}
              <span 
                onClick={() => !isLoading && router.push('/register')}
                className={`text-primary font-semibold transition-colors duration-150 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-secondary cursor-pointer'}`}
              >
                Sign Up
              </span>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}

export default LoginForm;