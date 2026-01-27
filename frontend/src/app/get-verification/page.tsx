"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageSquare, Settings, 
  ChevronLeft, BadgeCheck, Check, Star,
  Menu, Bell, X, GraduationCap, LayoutDashboard
} from 'lucide-react';

export default function GetVerificationPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pricing Configuration
  const pricing = {
    personal: {
      monthly: { price: 350, label: 'per month' },
      yearly: { price: 122, label: 'per month', total: 1470, savings: '65% OFF' }
    },
    business: {
      monthly: { price: 999, label: 'per month' },
      yearly: { price: 350, label: 'per month', total: 4196, savings: '65% OFF' }
    }
  };

  const benefits = {
    personal: [
      "Verified badge on your profile",
      "Prioritized in search results",
      "Access to exclusive workshops",
      "Unlimited connection requests",
      "Profile analytics insights"
    ],
    business: [
      "Gold verified badge for company",
      "Post unlimited job listings",
      "Advanced candidate filtering",
      "Featured company profile",
      "Dedicated account support",
      "Team management tools"
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      
      {/* DESKTOP SIDEBAR */}
      <div className="w-[80px] bg-white border-r border-gray-100 flex-col items-center py-6 gap-8 z-20 hidden md:flex">
        <Link href="/feed" className="w-10 h-10 rounded-lg bg-[#E50914] flex items-center justify-center text-white mb-4 shadow-md hover:bg-[#cc0812] transition-colors">
           <span className="font-bold text-xl">M</span>
        </Link>

        <div className="flex flex-col gap-6 w-full items-center">
          <Link href="/feed" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <LayoutGrid size={24} />
            <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Feed</span>
          </Link>
          
          <Link href="/builders" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <Users size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Builders</span>
          </Link>

          <Link href="/messages" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <MessageSquare size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Messages</span>
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-6 w-full items-center">
          <Link href="/settings" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <Settings size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
          </Link>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-md transition-all">
            JD
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* HEADER */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             {/* Mobile Menu Icon */}
             <button 
                className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
             <Link href="/feed" className="text-gray-400 hover:text-black transition-colors hidden md:block">
               <ChevronLeft size={24} />
             </Link>
             <h1 className="text-xl font-bold text-gray-800">Get Verified</h1>
           </div>

           <div className="flex items-center gap-3">
             {/* Notification Icon */}
             <Link href="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
               <Bell size={24} />
               <div className="absolute top-1 right-1 w-5 h-5 bg-[#E50914] rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
                 3
               </div>
             </Link>
           </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Drawer Content */}
            <div className="absolute top-0 left-0 w-full h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E50914]">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                   </div>
                   <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#F4A261]">Magna</span>
                      <span className="text-[#E50914]">Coders</span>
                   </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-4 space-y-6 pb-20">
                 {/* Navigation Links */}
                 <div className="space-y-1">
                    <Link href="/feed" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>
                    <Link href="/builders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                      <Users size={20} />
                      Find Builders
                    </Link>
                    <Link href="/magna-school" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                      <GraduationCap size={20} />
                      Magna School
                    </Link>
                    <Link href="/get-verification" className="flex items-center gap-3 px-4 py-3 bg-[#E50914]/5 text-[#E50914] rounded-xl font-medium">
                      <BadgeCheck size={20} />
                      Get Verified
                    </Link>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-black mb-3">Choose Your Verification Badge</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Boost your credibility, stand out to recruiters, and unlock exclusive features with a verified badge.
            </p>

            {/* BILLING TOGGLE */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-black' : 'text-gray-400'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 rounded-full bg-gray-200 relative transition-colors duration-300"
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-[#E50914] shadow-sm transition-all duration-300 ${billingCycle === 'yearly' ? 'left-7' : 'left-1'}`}></div>
              </button>
              <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-black' : 'text-gray-400'}`}>
                Yearly <span className="text-[#E50914] text-xs ml-1">(Save 65%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* PERSONAL PLAN */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F4A261] to-[#E50914]"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-black flex items-center gap-2">
                    Personal
                    <BadgeCheck size={20} className="text-[#E50914]" />
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">For developers & creators</p>
                </div>
                {billingCycle === 'yearly' && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    {pricing.personal.yearly.savings}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-black">
                    KES {billingCycle === 'yearly' ? pricing.personal.yearly.price : pricing.personal.monthly.price}
                  </span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-xs text-gray-400 mt-2">
                    Billed yearly at KES {pricing.personal.yearly.total}
                  </p>
                )}
              </div>

              <button className="w-full py-3 rounded-xl bg-black text-white font-bold mb-8 hover:bg-gray-800 transition-all shadow-md">
                Get Personal Badge
              </button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">What&apos;s included</p>
                {benefits.personal.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E50914]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#E50914]" />
                    </div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BUSINESS PLAN */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-800 to-black"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-black flex items-center gap-2">
                    Business
                    <div className="relative">
                      <BadgeCheck size={20} className="text-[#F4A261]" />
                      <Star size={8} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
                    </div>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">For companies & startups</p>
                </div>
                {billingCycle === 'yearly' && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    {pricing.business.yearly.savings}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-black">
                    KES {billingCycle === 'yearly' ? pricing.business.yearly.price : pricing.business.monthly.price}
                  </span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-xs text-gray-400 mt-2">
                    Billed yearly at KES {pricing.business.yearly.total}
                  </p>
                )}
              </div>

              <button className="w-full py-3 rounded-xl bg-[#F4A261] text-white font-bold mb-8 hover:bg-[#e08e4d] transition-all shadow-md">
                Get Business Badge
              </button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">What&apos;s included</p>
                {benefits.business.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F4A261]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#F4A261]" />
                    </div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-16 text-center text-sm text-gray-400">
            <p>Secure payment via M-Pesa or Card. Cancel anytime.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
