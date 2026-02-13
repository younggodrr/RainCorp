"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNavigation from '@/components/TopNavigation';
import LeftPanel from '@/components/LeftPanel';
import UserPrivacySelector from '@/components/UserPrivacySelector';
import PostEditor from '@/components/PostEditor';
import PostToolbar from '@/components/PostToolbar';

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacy, setPrivacy] = useState('Public');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    // Check for authentication on mount
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login immediately
      // router.push('/login');
      // For now, we'll just log it, but in a real app you'd redirect
      console.warn('No access token found on mount. User may need to login.');
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !selectedImage) return;
    
    setIsSubmitting(true);
    
    try {
      // Get the API URL from env
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      // Try to get token from localStorage first, then check if it's stored in cookies or session if needed
      // For now, we'll log what we found to help debug
      const token = localStorage.getItem('accessToken');
      console.log('Current access token:', token ? 'Found' : 'Missing');
      
      // Temporary fallback: if token is missing but user is "logged in" in their mind, 
      // check if we have any other potential token keys (some backends use 'token')
      let fallbackToken = token || localStorage.getItem('token');

      // If still no token, try to see if it's inside the user object (sometimes stored there)
      if (!fallbackToken) {
        try {
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const userObj = JSON.parse(userStr);
            if (userObj.token) fallbackToken = userObj.token;
            if (userObj.accessToken) fallbackToken = userObj.accessToken;
          }
        } catch (e) {
          console.error("Error parsing user object for token", e);
        }
      }
      
      // FOR DEBUGGING ONLY: Remove this in production!
      // If no token found, check if we have a userid, if so, maybe we can proceed without a token?
      // Or maybe the token is in a different format or location?
      
      if (!fallbackToken) {
        // Optional: Redirect to login if no token found
        // router.push('/login');
        console.error("Authentication failed: No access token found in localStorage.");
        throw new Error('You must be logged in to post. Please try logging in again.');
      }

      const postBody = {
        title: content.length > 50 ? content.slice(0, 50) + "..." : content,
        content: content,
        // image: selectedImage // Optional: handle image upload separately or as base64
      };

      const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${fallbackToken}`
        },
        body: JSON.stringify(postBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      console.log('Post created successfully');
      router.push('/feed');
      
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canPost = Boolean(content.trim() || selectedImage);

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      <TopNavigation 
        title="Create Post"
        showBack={true}
        hideBackOnMobile={true}
        showSearch={false}
        onMobileMenuOpen={() => {}}
        isDarkMode={isDarkMode}
        customAction={
          <button 
            onClick={handlePost}
            disabled={!canPost || isSubmitting}
            className="text-[#E50914] font-bold text-sm disabled:opacity-50 md:hidden"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        }
      />
      
      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab="Create Post"
        setActiveTab={() => {}}
        isSidebarExpanded={true}
        setIsSidebarExpanded={() => {}}
        isDarkMode={isDarkMode}
        toggleTheme={() => {}} // CreatePost handles theme internally via localStorage listener, but toggle could be wired up if needed
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 w-full md:ml-[88px] lg:ml-[260px] p-0 md:p-8 pt-20 md:pt-24 max-w-3xl mx-auto transition-all duration-300">

        <div className={`md:rounded-3xl shadow-sm border min-h-[calc(100vh-60px)] md:min-h-[500px] flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
          
          {/* User Info & Privacy */}
          <UserPrivacySelector 
            userName="John Doe"
            userInitials="JD"
            privacy={privacy}
            onPrivacyChange={setPrivacy}
            isDarkMode={isDarkMode}
          />

          {/* Input Area */}
          <PostEditor 
            content={content}
            setContent={setContent}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDarkMode={isDarkMode}
          />

          {/* Bottom Toolbar */}
          <PostToolbar 
            onImageSelect={handleImageSelect}
            contentLength={content.length}
            isSubmitting={isSubmitting}
            onPost={handlePost}
            canPost={canPost}
            isDarkMode={isDarkMode}
          />

        </div>

      </main>
    </div>
  );
}
