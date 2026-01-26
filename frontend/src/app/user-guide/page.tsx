"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronRight, ChevronLeft, Check, User, MapPin, Briefcase, Award, Target } from 'lucide-react';

// --- Constants ---

const ROLES = [
  { id: 'entrepreneur', label: 'Entrepreneur', description: 'Creating and leading innovative ventures' },
  { id: 'visionary', label: 'Visionary', description: 'Turning ideas into reality' },
  { id: 'software_engineer', label: 'Software Engineer', description: 'Bringing ideas to life through code' },
  { id: 'ux_ui_specialist', label: 'UX/UI Specialist', description: 'Designing seamless and engaging user interfaces' },
  { id: 'growth_strategist', label: 'Growth Strategist', description: 'Expanding reach and accelerating product growth' },
  { id: 'seed_investor', label: 'Seed Investor', description: 'Empowering the next generation of startups' },
  { id: 'mentor', label: 'Mentor', description: 'Guiding founders and teams towards success' },
  { id: 'talent_seeker', label: 'Talent Seeker', description: 'Building teams and hiring top talent' },
];

const GOALS = [
  { id: 'team_member', label: 'Team Member', description: 'Collaborate and grow with a team' },
  { id: 'accountability_partner', label: 'Accountability Partner', description: 'Stay on track and motivated together' },
  { id: 'mentor_goal', label: 'Mentor', description: 'Receive expert guidance and mentorship' },
  { id: 'networking', label: 'Networking & Opportunities', description: 'Connect and offer your skills and services' },
  { id: 'investment', label: 'Investment Prospect', description: 'Discover promising startups to invest in' },
  { id: 'technical_cofounder', label: 'Technical Co-founder', description: 'Partner to build and scale the product' },
  { id: 'design_assistance', label: 'Design Assistance', description: 'UI/UX and product design' },
];

const SPECIALISATIONS = [
  'Frontend', 'Backend', 'Full-stack', 'Mobile', 'Gaming', 
  'Cyber-security', 'Web 3', 'Artificial/Machine Learning', 'Data Analyst', 'Robotics'
];

const SKILLS = [
  'Node.js', 'Angular', 'Vue.js', 'Python', 'React', 'TypeScript', 'PostgreSQL', 'MongoDB',
  'React Native', 'Rust', 'AWS', 'Docker', 'Go', 'Kotlin', 'Swift', 'Flutter'
];

const AVAILABILITY = [
  'Fulltime roles', 'Side projects', 'Contract work'
];

const COUNTIES = [
  'Baringo County', 'Bomet County', 'Bungoma County', 'Busia County', 'Elgeyo/Marakwet County',
  'Embu County', 'Garissa County', 'Homa Bay County', 'Isiolo County', 'Kajiado County',
  'Kakamega County', 'Kericho County', 'Kiambu County', 'Kilifi County', 'Kirinyaga County',
  'Kisii County', 'Kisumu County', 'Kitui County', 'Kwale County', 'Laikipia County',
  'Lamu County', 'Machakos County', 'Makueni County', 'Mandera County', 'Marsabit County',
  'Meru County', 'Migori County', 'Mombasa County', "Murang'a County", 'Nairobi City County',
  'Nakuru County', 'Nandi County', 'Narok County', 'Nyamira County', 'Nyandarua County',
  'Nyeri County', 'Samburu County', 'Siaya County', 'Taita/Taveta County', 'Tana River County',
  'Tharaka-Nithi County', 'Trans Nzoia County', 'Turkana County', 'Uasin Gishu County',
  'Vihiga County', 'Wajir County', 'West Pokot County'
];

// --- Types ---

type FormData = {
  gender: string;
  profilePicture: File | null;
  roles: string[];
  goals: string[];
  specialisation: string;
  skills: string[];
  availability: string[];
  bio: string;
  country: string;
  county: string;
};

// --- Main Component ---

export default function UserGuidePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    profilePicture: null,
    roles: [],
    goals: [],
    specialisation: '',
    skills: [],
    availability: [],
    bio: '',
    country: '',
    county: '',
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (key: 'roles' | 'goals' | 'skills' | 'availability', value: string, max?: number) => {
    setFormData(prev => {
      const current = prev[key];
      const exists = current.includes(value);
      
      if (exists) {
        return { ...prev, [key]: current.filter(item => item !== value) };
      } else {
        if (max && current.length >= max) return prev;
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-black text-center mb-8">How do you identify?</h2>
            <div className="space-y-4 max-w-md mx-auto">
              {['Male', 'Female', 'Prefer not to say'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData('gender', option)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    formData.gender === option 
                      ? 'border-[#E50914] bg-[#E50914]/5 text-[#E50914]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-bold text-black">{option}</span>
                  {formData.gender === option && <Check size={20} />}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-extrabold text-black mb-2">Add a profile picture</h2>
            <p className="text-gray-500 mb-8">Put a face to the name</p>
            
            <div className="relative w-40 h-40 mx-auto bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg group cursor-pointer">
              {formData.profilePicture ? (
                <Image 
                  src={URL.createObjectURL(formData.profilePicture)} 
                  alt="Profile" 
                  fill
                  className="object-cover"
                />
              ) : (
                <User size={64} className="text-gray-300" />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Camera className="text-white" size={32} />
              </div>
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    updateFormData('profilePicture', e.target.files[0]);
                  }
                }}
              />
            </div>
            
            <button className="text-[#E50914] font-medium text-sm hover:underline mt-4">
              Choose a different photo
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-black mb-2">What describes you best?</h2>
              <p className="text-gray-500">Select up to two options</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => toggleSelection('roles', role.id, 2)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.roles.includes(role.id)
                      ? 'border-[#E50914] bg-[#E50914]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-extrabold text-black mb-1 flex justify-between items-center">
                    {role.label}
                    {formData.roles.includes(role.id) && <Check size={18} className="text-[#E50914]" />}
                  </div>
                  <div className="text-xs text-gray-500">{role.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-black mb-2">What are you looking for?</h2>
              <p className="text-gray-500">Select up to three options</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleSelection('goals', goal.id, 3)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.goals.includes(goal.id)
                      ? 'border-[#F4A261] bg-[#F4A261]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-extrabold text-black mb-1 flex justify-between items-center">
                    {goal.label}
                    {formData.goals.includes(goal.id) && <Check size={18} className="text-[#F4A261]" />}
                  </div>
                  <div className="text-xs text-gray-500">{goal.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-black mb-2">Tell us more</h2>
              <p className="text-gray-500">This makes it easy to find better matches for you</p>
            </div>

            {/* Specialisation */}
            <div>
              <h3 className="font-extrabold mb-3 flex items-center gap-2 text-black">
                <Briefcase size={18} className="text-[#E50914]" />
                Specialisation
              </h3>
              <div className="flex flex-wrap gap-2">
                {SPECIALISATIONS.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => updateFormData('specialisation', spec)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.specialisation === spec
                        ? 'bg-[#E50914] text-white border-[#E50914]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Skills */}
            <div>
              <h3 className="font-extrabold mb-3 flex items-center gap-2 text-black">
                <Award size={18} className="text-[#F4A261]" />
                Top Skills <span className="text-xs font-normal text-gray-400 ml-2">(Max 6)</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSelection('skills', skill, 6)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-[#F4A261] text-white border-[#F4A261]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-extrabold mb-3 flex items-center gap-2 text-black">
                <Target size={18} className="text-[#2ECC71]" />
                Available for
              </h3>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY.map((avail) => (
                  <button
                    key={avail}
                    onClick={() => toggleSelection('availability', avail)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.availability.includes(avail)
                        ? 'bg-[#2ECC71] text-white border-[#2ECC71]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {avail}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-black mb-2">Final touches</h2>
              <p className="text-gray-500">Let others know who you are</p>
            </div>

            {/* Bio */}
            <div>
              <label className="block font-bold mb-2 text-black">Share a bit info about you</label>
              <textarea
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="Tell us about your journey, interests, and what drives you..."
                className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] outline-none resize-none bg-gray-50"
              />
              <div className="text-right mt-1">
                <span className={`text-xs ${formData.bio.length > 0 && formData.bio.length < 40 ? 'text-red-500' : 'text-gray-400'}`}>
                  {formData.bio.length} / 40 minimum characters
                </span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block font-bold mb-2 flex items-center gap-2 text-black">
                <MapPin size={18} />
                Location
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Country (e.g. Kenya)"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] outline-none bg-white"
                />

                {formData.country.toLowerCase() === 'kenya' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-bold text-black">Select County</label>
                    <select
                      value={formData.county}
                      onChange={(e) => updateFormData('county', e.target.value)}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] outline-none bg-white appearance-none"
                    >
                      <option value="">Select a county...</option>
                      {COUNTIES.map((county) => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1: return !formData.gender;
      case 2: return false; // Optional? Or force? Assuming optional for now as user can "skip" usually, but prompt implies sequential. Let's make it optional.
      case 3: return formData.roles.length === 0;
      case 4: return formData.goals.length === 0;
      case 5: return !formData.specialisation || formData.skills.length === 0 || formData.availability.length === 0;
      case 6: return formData.bio.length < 40 || !formData.country || (formData.country.toLowerCase() === 'kenya' && !formData.county);
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[600px]">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 w-full">
          <div 
            className="h-full bg-gradient-to-r from-[#F4A261] to-[#E50914] transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              step === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <div className="flex gap-2">
            <div className="text-sm text-gray-400 font-medium flex items-center mr-4">
              Step {step} of {totalSteps}
            </div>
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all shadow-md ${
                isNextDisabled()
                  ? 'bg-gray-300 cursor-not-allowed shadow-none'
                  : 'bg-[#E50914] hover:bg-[#cc0812] hover:shadow-lg'
              }`}
            >
              {step === totalSteps ? 'Complete' : 'Next'}
              {step !== totalSteps && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
