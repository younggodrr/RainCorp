"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Users, Lightbulb, TrendingUp, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9E8B2] to-[#FBE6A4] text-[#444444] font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9E8B2]/90 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              {/* Abstract Tree/Crest Icon Placeholder */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#F4A261]">Magna</span>
              <span className="text-[#E50914]">Coders</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-black font-medium hover:text-[#E50914] transition-colors">Features</Link>
            <Link href="#community" className="text-black font-medium hover:text-[#E50914] transition-colors">Community</Link>
            <Link href="#about" className="text-black font-medium hover:text-[#E50914] transition-colors">About</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-6 py-2.5 rounded-full border-2 border-[#E50914] text-[#E50914] font-medium bg-white hover:bg-red-50 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 rounded-full bg-[#E50914] text-white font-medium shadow-md hover:bg-[#cc0812] hover:shadow-lg transition-all"
            >
              Join Community
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="md:hidden text-black p-2">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#F9E8B2] border-t border-white/20 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <Link href="#features" className="text-black font-medium py-2" onClick={toggleMobileMenu}>Features</Link>
                <Link href="#community" className="text-black font-medium py-2" onClick={toggleMobileMenu}>Community</Link>
                <Link href="#about" className="text-black font-medium py-2" onClick={toggleMobileMenu}>About</Link>
                <div className="h-px bg-gray-300 my-2"></div>
                <Link href="/login" className="text-[#E50914] font-bold py-2" onClick={toggleMobileMenu}>Sign In</Link>
                <Link href="/register" className="bg-[#E50914] text-white text-center py-3 rounded-full font-medium shadow-sm" onClick={toggleMobileMenu}>Join Community</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Stack */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8 text-center md:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center md:justify-start">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#F4A261]/50 shadow-sm text-sm font-medium text-[#444444]">
                Where Skills Meet Purpose
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-black">Build. Collaborate.</span><br />
              <span className="text-[#E50914]">Create Impact</span><br />
              <span className="text-black">Together</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#444444] leading-relaxed max-w-[520px] mx-auto md:mx-0">
              Join Kenya&apos;s premier community of developers, designers, and innovators. Connect with talent, collaborate on projects, and turn ideas into reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/register" 
                className="px-8 py-4 rounded-full bg-[#E50914] text-white font-semibold text-lg shadow-md hover:bg-[#cc0812] hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link 
                href="/projects" 
                className="px-8 py-4 rounded-full bg-white border-2 border-[#E50914] text-[#E50914] font-semibold text-lg hover:bg-red-50 transition-all"
              >
                Explore Projects
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-black/5">
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#E50914]">5,000+</div>
                <div className="text-sm font-medium text-[#777777]">Active Members</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#F4A261]">1,200+</div>
                <div className="text-sm font-medium text-[#777777]">Projects Completed</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">98%</div>
                <div className="text-sm font-medium text-[#777777]">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Feature Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <FeatureCard 
              icon={<Code2 className="w-8 h-8 text-[#E50914]" />}
              title="Developer Network"
              subtitle="Connect with skilled developers"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-[#F4A261]" />}
              title="Team Building"
              subtitle="Form project teams easily"
              className="sm:translate-y-8"
            />
            <FeatureCard 
              icon={<Lightbulb className="w-8 h-8 text-[#E50914]" />}
              title="Share Ideas"
              subtitle="Bring concepts to life"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-[#F4A261]" />}
              title="Grow Together"
              subtitle="Build your portfolio"
              className="sm:translate-y-8"
            />
          </motion.div>

        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, subtitle, className = "" }: { icon: React.ReactNode; title: string; subtitle: string; className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#F9E8B2] ${className}`}
    >
      <div className="bg-gray-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
      <p className="text-[#777777] text-sm">{subtitle}</p>
    </motion.div>
  );
}
