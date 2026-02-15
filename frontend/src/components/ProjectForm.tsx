import React from 'react';
import { Upload, Github, FolderKanban, Check } from 'lucide-react';

interface ProjectFormProps {
  onCancel: () => void;
  isDarkMode: boolean;
  onSuccess?: () => void;
}

export default function ProjectForm({ onCancel, isDarkMode, onSuccess }: ProjectFormProps) {
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    techStack: '',
    membersNeeded: '',
    github: '',
  });
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const body = {
        title: form.title,
        description: form.description,
        category: form.category,
        difficulty: form.difficulty,
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
        membersNeeded: Number(form.membersNeeded),
        github: form.github,
      };
      const res = await fetch(`${apiUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Failed to create project');
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form 
      className={`rounded-[24px] p-6 md:p-8 shadow-sm space-y-6 ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`} 
      onSubmit={handleSubmit}
    >
      
      {/* Project Title */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Title</label>
        <input 
          type="text" 
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter project title" 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Attach Photo */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Attach Image / Logo</label>
        <div className={`w-full px-4 py-8 rounded-xl border border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer group ${isDarkMode ? 'bg-[#222] border-gray-700 hover:border-[#E50914]' : 'bg-gray-50 border-gray-300 hover:border-[#E50914]'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-[#333]' : 'bg-white'}`}>
            <Upload size={20} className="text-gray-400 group-hover:text-[#E50914]" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-[#E50914]">Click to upload image</span>
          <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max. 2MB)</span>
          <input type="file" className="hidden" accept="image/*" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
        <textarea 
          rows={4} 
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your project..." 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium resize-none ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Two Column Layout for Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div className="space-y-2">
          <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
          <div className="relative">
            <select name="category" value={form.category} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}>
              <option value="">Select Category</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="ai">AI/ML</option>
              <option value="game">Game Development</option>
              <option value="blockchain">Blockchain</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-2">
          <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Difficulty Level</label>
          <div className="relative">
            <select name="difficulty" value={form.difficulty} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}>
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack (comma separated)</label>
        <input 
          type="text" 
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB..." 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Team Size Needed */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Team Size Needed</label>
        <input 
          type="number" 
          min="1"
          name="membersNeeded"
          value={form.membersNeeded}
          onChange={handleChange}
          placeholder="e.g. 3" 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* GitHub Link */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>GitHub Repository (Optional)</label>
        <div className="relative">
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="url" 
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="https://github.com/username/repo" 
            className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
          />
        </div>
      </div>

      {/* Create Group Option */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Communication</label>
        <div 
          className={`w-full p-4 rounded-xl border shadow-sm flex items-center justify-between opacity-80 cursor-not-allowed ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-[#E50914]'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#E50914] text-white">
              <FolderKanban size={20} />
            </div>
            <div className="text-left">
              <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Group&apos;s Project will be created</h4>
              <p className="text-xs text-gray-500">User will be added to the project&apos;s chat group automatically once approved by you</p>
            </div>
          </div>
          
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all border-[#E50914] bg-[#E50914] text-white">
            <Check size={14} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex flex-col-reverse md:flex-row gap-4">
         <button 
          type="button"
          onClick={onCancel} 
          className={`flex-1 py-3.5 border rounded-xl font-bold text-sm transition-colors text-center ${isDarkMode ? 'bg-[#222] border-gray-700 text-gray-300 hover:bg-[#333]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          Cancel
        </button>
        <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#cc0812] transition-all active:scale-95 disabled:opacity-60">
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </div>

    </form>
  );
}
