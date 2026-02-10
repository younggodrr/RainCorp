import React from 'react';
import { paymentHistoryData } from '@/app/settings/data';

export default function PaymentHistorySettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Payment History</h2>
      
      <div className="space-y-4">
        {paymentHistoryData.map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date} • {item.invoice}</p>
                </div>
                <div className="text-right">
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.amount}</p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>{item.status}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
