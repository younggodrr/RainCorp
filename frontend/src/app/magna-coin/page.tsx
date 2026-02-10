"use client";

import React, { useState, useEffect } from 'react';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import MobileDrawer from '@/components/MobileDrawer';
import MagnaCoinBalanceCard from '@/components/MagnaCoinBalanceCard';
import CoinPackageList from '@/components/CoinPackageList';
import PaymentMethodList from '@/components/PaymentMethodList';
import MagnaCoinBenefits from '@/components/MagnaCoinBenefits';
import TransactionHistory from '@/components/TransactionHistory';
import PurchaseButton from '@/components/PurchaseButton';
import { coinPackages, paymentMethods, transactions } from './constants';

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
        <MobileDrawer 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
          isDarkMode={isDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleTheme={toggleTheme}
        />

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-[65px] md:pt-0">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <div className="mb-6 md:mb-8">
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Magna Coin Wallet</h1>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your coins and recharge your balance</p>
            </div>

            {/* BALANCE CARD */}
            <MagnaCoinBalanceCard 
              balance={coinBalance} 
              maxCoins={maxCoins} 
              isDarkMode={isDarkMode} 
            />

            {/* PURCHASE SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-24 md:pb-0">
              
              {/* Packages */}
              <div className="lg:col-span-2">
                <CoinPackageList 
                  packages={coinPackages} 
                  selectedPackageId={selectedPackage} 
                  onSelect={setSelectedPackage} 
                  isDarkMode={isDarkMode} 
                />

                {/* Payment Methods */}
                <PaymentMethodList 
                  methods={paymentMethods} 
                  selectedMethodId={selectedPayment} 
                  onSelect={setSelectedPayment} 
                  isDarkMode={isDarkMode} 
                />

                <PurchaseButton 
                  disabled={!selectedPackage || !selectedPayment}
                  isDarkMode={isDarkMode}
                  // onClick={() => {}} // Add purchase logic here
                />
              </div>

              {/* Info / History Sidebar */}
              <div className="space-y-6">
                {/* Benefits */}
                <MagnaCoinBenefits isDarkMode={isDarkMode} />

                {/* History */}
                <TransactionHistory transactions={transactions} isDarkMode={isDarkMode} />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
