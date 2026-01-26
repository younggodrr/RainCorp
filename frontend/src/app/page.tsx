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
      <main className="w-full">
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-center">
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
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
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
              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-black/5">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold text-[#E50914]">5,000+</div>
                  <div className="text-sm font-medium text-[#777777]">Active Members</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold text-[#F4A261]">1,200+</div>
                  <div className="text-sm font-medium text-[#777777]">Projects Completed</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold text-[#22c55e]">98%</div>
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
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Why Magna Coders?</h2>
              <p className="text-xl text-[#444444]">Everything you need to build, grow, and scale your tech career in Kenya and beyond.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8 text-[#E50914]" />,
                  title: "Vibrant Community",
                  desc: "Connect with thousands of developers, designers, and founders."
                },
                {
                  icon: <Code2 className="w-8 h-8 text-[#F4A261]" />,
                  title: "Project Collaboration",
                  desc: "Find the perfect team members for your next big idea."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-[#E50914]" />,
                  title: "Career Growth",
                  desc: "Access mentorship, job opportunities, and skill development."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="bg-[#F9E8B2]/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                  <p className="text-[#666666] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#E50914] opacity-[0.03]"></div>
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="bg-black rounded-[3rem] p-8 md:p-16 text-center text-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Start Building?</h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 relative z-10">
                Join the fastest growing tech community in the region. Your next co-founder, mentor, or opportunity is waiting.
              </p>
              
              <Link 
                href="/register" 
                className="inline-block px-10 py-4 rounded-full bg-[#E50914] text-white font-bold text-lg hover:bg-[#cc0812] transition-transform hover:scale-105 relative z-10"
              >
                Join Now - It&apos;s Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center text-white text-xs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">
                  <span className="text-[#F4A261]">Magna</span>
                  <span className="text-[#E50914]">Coders</span>
                </span>
              </Link>
              <p className="text-[#666666] text-sm leading-relaxed">
                Empowering the next generation of tech innovators through community, collaboration, and code.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-black mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-[#666666]">
                <li><Link href="#features" className="hover:text-[#E50914]">Features</Link></li>
                <li><Link href="#community" className="hover:text-[#E50914]">Community</Link></li>
                <li><Link href="/projects" className="hover:text-[#E50914]">Projects</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-black mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-[#666666]">
                <li><Link href="/about" className="hover:text-[#E50914]">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-[#E50914]">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-[#E50914]">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-black mb-4">Connect</h4>
              <ul className="space-y-3 text-sm text-[#666666]">
                <li><a href="#" className="hover:text-[#E50914]">Twitter</a></li>
                <li><a href="#" className="hover:text-[#E50914]">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#E50914]">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 Magna Coders. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#E50914]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#E50914]">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
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
