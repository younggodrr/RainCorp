"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, CreditCard, Wallet, Coins, ArrowRight,
  TrendingUp, History, ShieldCheck
} from 'lucide-react';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';

export default function MagnaCoinPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Magna Coin');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [coinBalance, setCoinBalance] = useState(2500);
  const maxCoins = 10000; // Example max for progress bar

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    window.dispatchEvent(new Event('themeChanged'));
  };

  const coinPackages = [
    {
      id: 1,
      coins: 500,
      price: 500,
      bonus: 0,
      popular: false
    },
    {
      id: 2,
      coins: 1000,
      price: 950,
      bonus: 50,
      popular: true
    },
    {
      id: 3,
      coins: 5000,
      price: 4500,
      bonus: 500,
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: 'M' }, // Placeholder for M-Pesa icon
    { id: 'paypal', name: 'PayPal', icon: 'P' }, // Placeholder for PayPal icon
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={24} /> }
  ];

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  return (
    <div className={`h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden relative md:ml-[88px] ${isSidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'} transition-all duration-300`}>
        
        {/* TOP NAVIGATION BAR (Mobile Only) */}
        <div className="md:hidden">
          <TopNavigation 
            title="Magna Coin" 
            onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 left-0 w-full h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left ${
              isDarkMode ? 'bg-black border-r border-[#E70008]/20' : 'bg-white'
            }`}>
              <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 ${
                isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-white border-gray-100'
              }`}>
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-[#E70008] flex items-center justify-center shadow-lg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                   </div>
                   <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#F4A261]">Magna</span>
                      <span className="text-[#E70008]">Coders</span>
                   </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'text-gray-400 hover:bg-[#E70008]/10' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 space-y-6 pb-20">
                <LeftPanel 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  closeMenu={() => setIsMobileMenuOpen(false)} 
                  isMobile={true}
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              </div>
            </div>
          </div>
        )}

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-[65px] md:pt-0">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <div className="mb-6 md:mb-8">
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Magna Coin Wallet</h1>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your coins and recharge your balance</p>
            </div>

            {/* BALANCE CARD */}
            <div className={`rounded-3xl p-5 md:p-8 mb-6 md:mb-8 relative overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-[#1a1a1a] to-black border border-[#E70008]/30' 
                : 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white shadow-xl'
            }`}>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E50914] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-gray-400 font-medium">
                    <Wallet size={20} />
                    <span>Current Balance</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-[#F4A261]' : 'text-white'}`}>{coinBalance.toLocaleString()}</span>
                    <span className="text-lg md:text-xl font-bold text-[#E50914]">MC</span>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-gray-400">Wallet Capacity</span>
                    <span className={isDarkMode ? 'text-[#F4A261]' : 'text-white'}>{Math.round((coinBalance / maxCoins) * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      className="h-full bg-gradient-to-r from-[#F4A261] to-[#E50914] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(229,9,20,0.5)]"
                      style={{ width: `${(coinBalance / maxCoins) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-gray-500">
                    <span>0 MC</span>
                    <span>{maxCoins.toLocaleString()} MC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PURCHASE SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-24 md:pb-0">
              
              {/* Packages */}
              <div className="lg:col-span-2">
                <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
                  <Coins className="text-[#E50914]" />
                  Select Package
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 md:mb-8">
                  {coinPackages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                        selectedPackage === pkg.id 
                          ? 'border-[#E50914] bg-[#E50914]/5 shadow-md scale-105' 
                          : isDarkMode 
                            ? 'border-[#333] bg-[#111] hover:border-[#E50914]/50' 
                            : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E50914] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          POPULAR
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
                          {pkg.coins}
                        </div>
                        <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider">Magna Coins</div>
                      </div>

                      {pkg.bonus > 0 && (
                        <div className="flex justify-center mb-4">
                          <span className="bg-[#2ECC71]/10 text-[#2ECC71] text-xs font-bold px-2 py-1 rounded-lg">
                            +{pkg.bonus} Bonus
                          </span>
                        </div>
                      )}

                      <div className={`text-center py-3 rounded-xl font-bold text-lg ${
                        selectedPackage === pkg.id
                          ? 'bg-[#E50914] text-white'
                          : isDarkMode ? 'bg-[#222] text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        KES {pkg.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Methods */}
                <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
                  <CreditCard className="text-[#E50914]" />
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-[#E50914] bg-[#E50914]/5'
                          : isDarkMode
                            ? 'border-[#333] bg-[#111] hover:bg-[#222]'
                            : 'border-gray-100 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        method.id === 'mpesa' ? 'bg-[#2ECC71] text-white' :
                        method.id === 'paypal' ? 'bg-[#003087] text-white' :
                        'bg-gray-800 text-white'
                      }`}>
                        {method.icon}
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {method.name}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  disabled={!selectedPackage || !selectedPayment}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                    !selectedPackage || !selectedPayment
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-[#E50914] text-white hover:bg-[#cc0812] active:scale-95'
                  }`}
                >
                  Complete Purchase <ArrowRight size={20} />
                </button>
              </div>

              {/* Info / History Sidebar */}
              <div className="space-y-6">
                {/* Benefits */}
                <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#111] border border-[#333]' : 'bg-white border border-gray-100'}`}>
                  <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
                    <ShieldCheck size={18} className="text-[#E50914]" />
                    Why Buy Magna Coins?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Unlock premium job applications',
                      'Boost your project visibility',
                      'Access advanced AI features',
                      'Tip content creators'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#E50914]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#E50914]"></div>
                        </div>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* History */}
                <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#111] border border-[#333]' : 'bg-white border border-gray-100'}`}>
                  <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
                    <History size={18} className="text-[#E50914]" />
                    Recent Transactions
                  </h3>
                  <div className="space-y-4">
                    {[
                      { type: 'Purchase', amount: '+500', date: 'Today, 10:30 AM', color: 'text-green-500' },
                      { type: 'Job Apply', amount: '-50', date: 'Yesterday, 2:15 PM', color: 'text-red-500' },
                      { type: 'AI Usage', amount: '-10', date: '2 days ago', color: 'text-red-500' }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{tx.type}</div>
                          <div className="text-xs text-gray-500">{tx.date}</div>
                        </div>
                        <div className={`font-bold ${tx.color}`}>{tx.amount} MC</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
