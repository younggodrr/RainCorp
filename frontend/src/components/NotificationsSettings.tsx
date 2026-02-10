import React from 'react';
import { ToggleRow } from './SettingsHelpers';

export default function NotificationsSettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Notifications</h2>
      <div className={`space-y-6 divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
        <ToggleRow title="Email Notifications" description="Receive emails about your account activity." defaultChecked isDarkMode={isDarkMode} />
        <ToggleRow title="Push Notifications" description="Receive push notifications on your device." defaultChecked isDarkMode={isDarkMode} />
        <ToggleRow title="Weekly Digest" description="Get a weekly summary of your stats." isDarkMode={isDarkMode} />
        <ToggleRow title="New Applicants" description="Get notified when someone applies to your job." defaultChecked isDarkMode={isDarkMode} />
        <ToggleRow title="Marketing Emails" description="Receive updates about new features and promotions." isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
