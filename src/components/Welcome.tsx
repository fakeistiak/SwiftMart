"use client"; 
import { motion } from "motion/react";
import { useRouter } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { FaArrowRightLong } from 'react-icons/fa6';

type propType={
    nextStep?: (s:number)=>void
}

function Welcome({nextStep}:propType) {
  const router = useRouter();
  return (
    /* Changed to fixed viewport height, flex centering, and overflow-hidden to prevent scrolls */
    <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6 bg-transparent">
      <div className="max-w-2xl w-full">
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }}  
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-48 h-48 flex items-center justify-center bg-transparent"
          >
            <DotLottieReact
              src="https://lottie.host/81552009-82fd-4578-8684-32902e36f79d/LzbyYueF4e.lottie"
              loop
              autoplay
              style={{ backgroundColor: 'transparent' }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }}  
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-42 h-42 flex items-center justify-center bg-transparent"
          >
            <DotLottieReact
              src="https://lottie.host/a7886818-f856-4d53-a048-0b11561939e8/ywetyP0NWA.lottie"
              loop
              autoplay
              style={{ backgroundColor: 'transparent' }} 
            />
          </motion.div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          ⚡ Superfast Delivery
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Welcome to{" "}
          <motion.span
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}   
            transition={{ duration: 0.5, ease: "easeOut" }} 
            className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            SwiftMart
          </motion.span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto font-medium leading-relaxed mb-8">
          Fresh groceries, household essentials, and daily treats delivered straight to your doorstep in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (typeof nextStep === 'function') nextStep(2);
              else router.push('/register');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 hover:bg-secondary transition-all duration-200 group"
          >
            Next
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
              <FaArrowRightLong />
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Welcome