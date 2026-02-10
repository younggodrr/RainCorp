import React from 'react';
import { Wallet } from 'lucide-react';

interface MagnaCoinBalanceCardProps {
  balance: number;
  maxCoins: number;
  isDarkMode: boolean;
}

export default function MagnaCoinBalanceCard({ balance, maxCoins, isDarkMode }: MagnaCoinBalanceCardProps) {
  return (
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
            <span className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-[#F4A261]' : 'text-white'}`}>{balance.toLocaleString()}</span>
            <span className="text-lg md:text-xl font-bold text-[#E50914]">MC</span>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-gray-400">Wallet Capacity</span>
            <span className={isDarkMode ? 'text-[#F4A261]' : 'text-white'}>{Math.round((balance / maxCoins) * 100)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-[#F4A261] to-[#E50914] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(229,9,20,0.5)]"
              style={{ width: `${(balance / maxCoins) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-gray-500">
            <span>0 MC</span>
            <span>{maxCoins.toLocaleString()} MC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
