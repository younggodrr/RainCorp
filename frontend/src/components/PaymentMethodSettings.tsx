import React from 'react';
import { Plus } from 'lucide-react';

export default function PaymentMethodSettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Payment Method</h2>
      
      <div className="space-y-6">
        <div className={`p-4 border rounded-xl flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>VISA</div>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-[#F4A261]' : 'text-gray-800'}`}>•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/24</p>
                </div>
            </div>
            <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
        </div>

        <div className={`p-4 border rounded-xl flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>MC</div>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>•••• •••• •••• 5555</p>
                    <p className="text-xs text-gray-500">Expires 10/25</p>
                </div>
            </div>
            <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
        </div>

        <button className={`w-full py-3 rounded-xl border-2 border-dashed font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
          isDarkMode 
            ? 'border-gray-700 text-gray-400 hover:border-[#E50914] hover:text-[#E50914]' 
            : 'border-gray-200 text-gray-400 hover:border-[#E50914] hover:text-[#E50914]'
        }`}>
            <Plus size={18} />
            Add New Card
        </button>
      </div>
    </div>
  );
}
