'use client';

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  ChevronLeft,
  Briefcase,
  Globe,
  MapPin,
  DollarSign,
  Heart,
  Share2,
  FolderKanban
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getPostById, FeedPost, JobPost, ProjectPost, TechNewsPost, RegularPost, generateMockComments } from '@/utils/mockData';
import LeftPanel from '@/components/LeftPanel';
import PostInteractionBar from '@/components/PostInteractionBar';
import Toast from '@/components/Toast';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<FeedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Toast State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  useEffect(() => {
    if (params?.id) {
      // Simulate fetch
      setTimeout(() => {
        const foundPost = getPostById(params.id as string);
        setPost(foundPost);
        setLoading(false);
      }, 500);
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#E50914] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/feed" className="text-[#E50914] hover:underline">Return to Feed</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex">
      <Toast 
        message={toastMessage} 
        isVisible={toastVisible} 
        onClose={() => setToastVisible(false)} 
      />

      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 w-full md:ml-[88px] lg:ml-[260px] p-4 md:p-8 max-w-5xl mx-auto transition-all duration-300 pb-24 md:pb-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium">Back to Feed</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             {/* Header */}
             <div className="p-6 md:p-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-2xl">
                        {post.author.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="font-bold text-black text-2xl">{post.author.name}</h1>
                        <p className="text-gray-500">{post.author.role}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span>{post.createdAt}</span>
                            <span>•</span>
                            <Globe size={12} />
                        </div>
                    </div>
                </div>
             </div>

            <div className="p-6 md:p-8">
                {/* Type Specific Content */}
                {post.type === 'job' && (
                    <div className="space-y-8">
                        <div className="border border-[#2ECC71]/30 rounded-2xl p-6 bg-[#2ECC71]/5">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 rounded-xl bg-[#F4A261] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                                    <Briefcase size={32} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-2xl text-black leading-tight">{(post as JobPost).title}</h2>
                                    <p className="text-gray-600 font-medium text-lg">{(post as JobPost).company}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Location</div>
                                    <div className="font-bold text-black flex items-center gap-2">
                                        <MapPin size={16} className="text-[#E50914]" />
                                        {(post as JobPost).location}
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Salary</div>
                                    <div className="font-bold text-black flex items-center gap-2">
                                        <DollarSign size={16} className="text-[#2ECC71]" />
                                        {(post as JobPost).salary}
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Type</div>
                                    <div className="font-bold text-black flex items-center gap-2">
                                        <Briefcase size={16} className="text-[#F4A261]" />
                                        {(post as JobPost).jobType}
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-xl text-black mb-4">Job Description</h3>
                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                {(post as JobPost).description}
                                <br/><br/>
                                We are looking for a passionate individual to join our growing team. You will be working on cutting-edge technologies and solving complex problems.
                            </p>

                            <h3 className="font-bold text-xl text-black mb-4">Requirements</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8 text-lg">
                                <li>3+ years of experience in frontend development</li>
                                <li>Strong knowledge of React and TypeScript</li>
                                <li>Experience with Next.js and Tailwind CSS</li>
                                <li>Good communication skills</li>
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {(post as JobPost).tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                setIsApplied(true);
                                showToast(`Application sent to ${post.author.name}!`);
                            }}
                            disabled={isApplied}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform ${
                                isApplied 
                                    ? 'bg-gray-400 cursor-default' 
                                    : 'bg-[#E50914] hover:bg-[#cc0812] hover:-translate-y-1'
                            }`}
                        >
                            {isApplied ? 'Applied' : 'Apply for this Position'}
                        </button>
                    </div>
                )}

                {post.type === 'project' && (
                    <div className="space-y-8">
                         <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                                Project Collaboration
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 font-medium">Looking for contributors</span>
                        </div>
                        
                        <h2 className="font-bold text-3xl text-black">{(post as ProjectPost).title}</h2>
                        
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {(post as ProjectPost).description}
                        </p>
                        
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h4 className="font-bold text-xl text-gray-900 mb-4">Project Details</h4>
                            <p className="text-gray-600 mb-6 text-lg">
                                We are building this project to solve a common problem in the developer community. We are looking for passionate developers to join us.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {(post as ProjectPost).tags.map(tag => (
                                    <span key={tag} className="px-5 py-2 rounded-full bg-[#F4A261] text-white text-sm font-bold shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <PostInteractionBar initialLikes={post.likes} initialComments={post.comments} initialCommentsData={generateMockComments(post.id, post.comments)} postId={post.id} />
                        </div>
                        
                        <button 
                            onClick={() => {
                                setIsRequestSent(true);
                                showToast(`Request sent. ${post.author.name} will review your request.`);
                            }}
                            disabled={isRequestSent}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform ${
                                isRequestSent 
                                    ? 'bg-gray-400 cursor-default' 
                                    : 'bg-[#E50914] hover:bg-[#cc0812] hover:-translate-y-1'
                            }`}
                        >
                            {isRequestSent ? 'Request Sent' : 'Request to Join'}
                        </button>
                    </div>
                )}

                {post.type === 'tech-news' && (
                    <div className="space-y-8">
                        {(post as TechNewsPost).imageUrl && (
                            <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden relative shadow-md">
                                <Image src={(post as TechNewsPost).imageUrl!} alt="News" fill className="object-cover" />
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center gap-2">
                                <Globe size={14} />
                                {(post as TechNewsPost).source}
                            </span>
                            <span className="text-gray-500 font-medium">{post.createdAt}</span>
                        </div>
                        <h2 className="font-bold text-3xl md:text-4xl text-black leading-tight">{(post as TechNewsPost).title}</h2>
                        <p className="text-gray-600 leading-relaxed text-xl">
                            {(post as TechNewsPost).summary}
                        </p>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 italic text-lg border-l-4 border-l-[#E50914]">
                            &quot;This is a placeholder for the full article content. In a real application, this would either fetch the full content or redirect to the source.&quot;
                        </div>
                        
                        <PostInteractionBar initialLikes={post.likes} initialComments={post.comments} initialCommentsData={generateMockComments(post.id, post.comments)} postId={post.id} />

                        <a href={(post as TechNewsPost).url} target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-black text-white font-bold text-lg shadow-lg hover:bg-gray-800 transition-all text-center transform hover:-translate-y-1">
                            Read Full Article
                        </a>
                    </div>
                )}

                {post.type === 'post' && (
                    <div className="space-y-8">
                         <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-bold inline-block">
                            Community Post
                        </span>
                        <h2 className="font-bold text-3xl text-black">{(post as RegularPost).title}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                            {(post as RegularPost).content}
                        </p>
                        {(post as RegularPost).image && (
                            <div className="w-full h-96 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm">
                               <Image src={(post as RegularPost).image!} alt="Post Content" fill className="object-cover" />
                            </div>
                        )}
                        
                        <PostInteractionBar initialLikes={post.likes} initialComments={post.comments} initialCommentsData={generateMockComments(post.id, post.comments)} postId={post.id} />
                        
                    </div>
                )}
            </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/feed" className="flex flex-col items-center gap-1 text-[#E50914] transition-colors">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-medium">Feed</span>
        </Link>
        <Link href="/builders" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <Users size={24} />
          <span className="text-[10px] font-medium">Builders</span>
        </Link>
        <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium">Chat</span>
        </Link>
        <Link href="/user-profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-[10px]">
             JD
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
