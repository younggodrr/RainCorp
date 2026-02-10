import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function WhatYouWillLearn() {
  const items = [
    "Build native mobile apps with React Native",
    "Master React Navigation & Routing",
    "Implement Authentication with Firebase",
    "Use device features like Camera & Location",
    "State Management with Redux Toolkit",
    "Publish apps to Apple App Store & Google Play"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <h3 className="font-bold text-xl mb-4 text-gray-900">What you&apos;ll learn</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle size={18} className="text-[#2ECC71] mt-0.5 shrink-0" />
            <span className="text-sm text-gray-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
