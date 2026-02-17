'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  FileText, 
  ShieldCheck, 
  AlertCircle,
  Plus,
  Bot,
  Download,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function ContractPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [contractMode, setContractMode] = useState<'view' | 'create' | 'ai'>('view');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock function to handle PDF download
  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('Downloading Contract PDF...');
  };

  const handleAIContractGeneration = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setContractMode('view');
      setShowCreateModal(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black pb-24 text-[#F9E4AD] font-sans selection:bg-[#E70008] selection:text-white">
      {/* Top Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-start mb-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Contract &<br/>Milestones</h1>
          <span className="px-3 py-1 bg-[#E70008]/20 border border-[#E70008] text-[#E70008] text-xs font-bold rounded-full tracking-wide">
            ACTIVE
          </span>
        </div>
        <p className="text-sm text-[#F9E4AD]/60 mb-6">Agreement + payment structure for this project</p>

        {/* Project Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-3">Shift Booking Platform</h3>
          <div className="space-y-2 text-sm text-[#F9E4AD]/80">
            <div className="flex justify-between">
              <span className="opacity-60">Client:</span>
              <span className="font-medium text-white">Greenway Logistics</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Developer:</span>
              <span className="font-medium text-white">Magna Coders Team</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Start date:</span>
              <span>16 Feb 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Est. delivery:</span>
              <span>21 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Card 1 — Contract Summary */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E70008]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-[#E70008]" />
              <h2 className="text-xl font-bold text-white">Contract Summary</h2>
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-[#F9E4AD] transition-colors"
              title="Download PDF"
            >
              <Download size={18} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-sm text-[#F9E4AD]/60">Total Budget</span>
              <span className="text-lg font-bold text-white">KES 180,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-sm text-[#F9E4AD]/60">Payment Method</span>
              <span className="text-sm font-medium text-white">Milestones + escrow</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-sm text-[#F9E4AD]/60">Ownership</span>
              <span className="text-sm font-medium text-white">Transfers after final payment</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-sm text-[#F9E4AD]/60">Revisions</span>
              <span className="text-sm font-medium text-white">2 rounds</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-sm text-[#F9E4AD]/60">Support</span>
              <span className="text-sm font-medium text-white">14 days post-delivery</span>
            </div>
            <div className="mt-3 bg-[#E70008]/5 border border-[#E70008]/20 rounded-lg p-3">
              <p className="text-xs text-[#E70008]/80 leading-relaxed">
                <span className="font-bold">Late Delivery Rule:</span> Milestone delays reduce payout by 2% per day after due date.
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#F9E4AD]/60">Client Signature</span>
              <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium bg-green-400/10 px-2 py-0.5 rounded-full">
                Signed <CheckCircle2 size={14} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#F9E4AD]/60">Developer Signature</span>
              <span className="flex items-center gap-1.5 text-amber-400 text-sm font-medium bg-amber-400/10 px-2 py-0.5 rounded-full">
                Pending <Clock size={14} />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 px-4 rounded-xl border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors">
              View Full Contract
            </button>
            <button className="py-3 px-4 rounded-xl bg-[#E70008] text-white font-medium text-sm shadow-[0_0_15px_rgba(231,0,8,0.3)] hover:bg-[#c90007] transition-colors">
              Sign Contract
            </button>
          </div>
        </div>

        {/* Card 2 — Milestone Timeline */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Milestones</h2>
            <span className="text-xs font-medium text-[#F9E4AD]/40">3 Steps</span>
          </div>

          <div className="relative space-y-8 pl-2">
            {/* Progress Line */}
            <div className="absolute left-[15px] top-3 bottom-3 w-[2px] bg-white/10 rounded-full">
              <div className="w-full h-[60%] bg-[#E70008] rounded-full"></div>
            </div>

            {/* Milestone 1 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#E70008] border-2 border-[#000] ring-1 ring-[#E70008] flex items-center justify-center">
                  <CheckCircle2 size={10} className="text-black fill-white" />
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-white">UI/UX Design</h4>
                  <span className="text-green-400 text-xs font-medium flex items-center gap-1">Completed <CheckCircle2 size={12} /></span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-lg font-bold text-white mb-1">KES 40,000</div>
                    <div className="text-xs text-[#F9E4AD]/60">Due: 20 Feb</div>
                  </div>
                  <button className="text-xs text-[#E70008] font-medium hover:underline">View details</button>
                </div>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#E70008] border-2 border-[#000] ring-4 ring-[#E70008]/20 animate-pulse"></div>
              </div>
              <div className="bg-[#1A1A1A] border border-[#E70008]/30 rounded-xl p-4 shadow-[0_4px_20px_-5px_rgba(231,0,8,0.15)]">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-white">MVP Development</h4>
                  <span className="text-amber-400 text-xs font-medium flex items-center gap-1">In Progress <Clock size={12} /></span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 mb-3 overflow-hidden">
                  <div className="bg-[#E70008] h-full rounded-full w-[60%]"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-lg font-bold text-white mb-1">KES 120,000</div>
                    <div className="text-xs text-[#F9E4AD]/60">Due: 10 Mar</div>
                  </div>
                  <button className="text-xs text-[#E70008] font-medium hover:underline">View details</button>
                </div>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="relative pl-8 opacity-60">
              <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white/20 border-2 border-[#000]"></div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-white">Deployment + Handover</h4>
                  <span className="text-white/40 text-xs font-medium flex items-center gap-1">Locked <Lock size={12} /></span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-lg font-bold text-white mb-1">KES 20,000</div>
                    <div className="text-xs text-[#F9E4AD]/60">Due: 18 Mar</div>
                  </div>
                  <button className="text-xs text-white/40 font-medium cursor-not-allowed">View details</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 — Escrow + Approval */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={20} className="text-[#E70008]" />
            <h2 className="text-xl font-bold text-white">Escrow & Release</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="text-xs text-[#F9E4AD]/60 mb-1">Escrow Balance</div>
              <div className="text-lg font-bold text-white">KES 120,000</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="text-xs text-[#F9E4AD]/60 mb-1">Next Release</div>
              <div className="text-lg font-bold text-[#E70008]">KES 60,000</div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-[#F9E4AD]/60 mb-1">Current Stage</div>
              <div className="text-sm font-medium text-white">Milestone 2 — MVP Development</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#E70008]/10 flex items-center justify-center">
               <Clock size={16} className="text-[#E70008]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="py-3 px-4 rounded-xl bg-[#E70008] text-white font-medium text-sm shadow-[0_0_15px_rgba(231,0,8,0.3)] hover:bg-[#c90007] transition-colors">
              Approve Milestone
            </button>
            <button className="py-3 px-4 rounded-xl border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors">
              Request Changes
            </button>
          </div>

          <div className="flex items-start gap-2">
            <AlertCircle size={14} className="text-[#F9E4AD]/40 mt-0.5 shrink-0" />
            <p className="text-[10px] text-[#F9E4AD]/40 leading-relaxed">
              Funds release only after client approval. Change requests are recorded and versioned.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#E70008] rounded-full shadow-[0_4px_20px_rgba(231,0,8,0.4)] flex items-center justify-center text-white z-40 hover:scale-105 transition-transform"
      >
        <Plus size={28} />
      </button>

      {/* Create Contract Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-[#111] w-full md:w-[500px] md:rounded-3xl rounded-t-3xl border border-white/10 p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create New Contract</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X size={20} className="text-[#F9E4AD]" />
              </button>
            </div>

            {contractMode === 'view' && (
              <div className="space-y-4">
                <button 
                  onClick={() => setContractMode('ai')}
                  className="w-full bg-gradient-to-r from-[#E70008]/20 to-[#FF9940]/20 border border-[#E70008]/50 rounded-xl p-4 flex items-center justify-between group hover:border-[#E70008] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E70008]/20 flex items-center justify-center text-[#E70008]">
                      <Bot size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold">AI Contract Generator</div>
                      <div className="text-xs text-[#F9E4AD]/60">Auto-draft terms based on project description</div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#F9E4AD]/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>

                <button 
                  onClick={() => setContractMode('create')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <FileText size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold">Manual Draft</div>
                      <div className="text-xs text-[#F9E4AD]/60">Write your own terms from scratch</div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#F9E4AD]/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            )}

            {contractMode === 'ai' && (
              <div className="space-y-6">
                {!isGenerating ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-[#F9E4AD]/80">Project Description</label>
                      <textarea 
                        className="w-full bg-black border border-white/20 rounded-xl p-3 text-white h-32 focus:border-[#E70008] focus:outline-none resize-none placeholder:text-white/20"
                        placeholder="e.g. Build a mobile app for shift booking with 3 milestones: Design, MVP, and Handover..."
                      ></textarea>
                    </div>
                    <button 
                      onClick={handleAIContractGeneration}
                      className="w-full py-4 bg-[#E70008] rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:bg-[#c90007] transition-colors"
                    >
                      <Sparkles size={18} /> Generate Contract
                    </button>
                  </>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border-4 border-[#E70008]/30 border-t-[#E70008] rounded-full animate-spin mb-4"></div>
                    <h3 className="text-lg font-bold text-white mb-1">AI is drafting your contract...</h3>
                    <p className="text-sm text-[#F9E4AD]/60">Analyzing project scope & milestones</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
