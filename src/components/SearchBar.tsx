import React from 'react';
import { Search, MapPin, Filter, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (filters: { role: string; skill: string; location: string }) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [role, setRole] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSearch = () => {
    onSearch({ role, skill, location });
  };

  return (
    <div className="bg-white/90 backdrop-blur-2xl p-4 md:p-6 rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-white flex flex-col lg:flex-row gap-4 items-center max-w-7xl mx-auto relative z-10">
      <div className="flex-1 w-full flex items-center gap-4 px-8 py-5 bg-gray-50/80 rounded-[2rem] border border-black/5 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-300">
        <Search size={24} className="text-primary" />
        <div className="flex flex-col flex-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Role</span>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            className="bg-transparent border-none outline-none w-full text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 w-full flex items-center gap-4 px-8 py-5 bg-gray-50/80 rounded-[2rem] border border-black/5 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-300">
        <Sparkles size={24} className="text-primary" />
        <div className="flex flex-col flex-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Skills</span>
          <input
            type="text"
            placeholder="React, Node, Python"
            className="bg-transparent border-none outline-none w-full text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 w-full flex items-center gap-4 px-8 py-5 bg-gray-50/80 rounded-[2rem] border border-black/5 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-300">
        <MapPin size={24} className="text-primary" />
        <div className="flex flex-col flex-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Location</span>
          <input
            type="text"
            placeholder="City or Neighborhood"
            className="bg-transparent border-none outline-none w-full text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full lg:w-auto bg-gray-900 text-white px-12 py-6 rounded-[2rem] font-bold text-lg hover:bg-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group"
      >
        <Filter size={22} className="group-hover:rotate-180 transition-transform duration-500" />
        Find Roles
      </button>
    </div>
  );
};
