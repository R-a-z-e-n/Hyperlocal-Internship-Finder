import React, { useEffect, useState } from 'react';
import { Internship } from '../types';
import { InternshipCard } from '../components/InternshipCard';
import { motion } from 'motion/react';
import { Bookmark, Sparkles } from 'lucide-react';

export const SavedPage: React.FC = () => {
  const [savedInternships, setSavedInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/saved');
      const data = await res.json();
      setSavedInternships(data);
    } catch (error) {
      console.error('Failed to fetch saved internships', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleApply = async (id: number) => {
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internshipId: id, applicantName: 'John Doe' }),
      });
      if (res.ok) {
        alert('Application submitted successfully!');
      }
    } catch (error) {
      alert('Failed to apply');
    }
  };

  const handleToggleSave = async (id: number) => {
    try {
      const res = await fetch('/api/saved/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internshipId: id }),
      });
      if (res.ok) {
        // Since we are on the saved page, if we unsave, we should remove it from the list
        setSavedInternships(prev => prev.filter(i => i.id !== id));
      }
    } catch (error) {
      console.error('Failed to toggle save', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] pt-24 pb-20 md:pb-12">
      <div className="bg-gray-900 py-24 w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#4f46e520,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#0ea5e915,transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
              Your <span className="text-primary italic">Collection.</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Keep track of the opportunities you're interested in and manage your applications.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-bold text-gray-900">Loading your collection...</span>
          </div>
        ) : savedInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {savedInternships.map((internship) => (
              <InternshipCard 
                key={internship.id} 
                internship={internship} 
                onApply={handleApply} 
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-black/5 shadow-2xl shadow-black/5">
            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-gray-200 border border-black/5">
              <Bookmark size={48} />
            </div>
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Your collection is empty</h3>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg">Start exploring the map and save roles that catch your eye to see them here.</p>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-black/5 active:scale-95"
            >
              Explore Opportunities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
