import React from 'react';
import { MapPin, DollarSign, ArrowRight, Heart, Share2, Check } from 'lucide-react';
import { Internship } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InternshipCardProps {
  internship: Internship;
  onApply: (id: number) => void;
  onToggleSave?: (id: number) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onApply, onToggleSave }) => {
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `${internship.role} at ${internship.company}`,
      text: `Check out this ${internship.role} internship at ${internship.company}!`,
      url: window.location.origin + '/dashboard',
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="bg-white hover:bg-white/80 rounded-[2.5rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col gap-6 group relative hover:backdrop-blur-xl"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Hiring Now</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-gray-900 group-hover:text-primary transition-colors leading-tight">{internship.role}</h3>
          <p className="text-primary font-bold text-sm tracking-widest uppercase opacity-80">{internship.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-3 rounded-2xl transition-all border bg-gray-50 border-black/5 text-gray-400 hover:text-primary hover:bg-primary/10 relative"
            title="Share"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                  <Check size={20} className="text-secondary" />
                </motion.div>
              ) : (
                <motion.div key="share" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                  <Share2 size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave?.(internship.id);
            }}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 border",
              internship.isSaved 
                ? "bg-pastel-pink border-pastel-pink text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
                : "bg-gray-50 border-black/5 text-gray-400 hover:text-pink-500 hover:bg-pastel-pink/50"
            )}
          >
            <motion.div
              key={internship.isSaved ? 'saved' : 'unsaved'}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Heart size={20} fill={internship.isSaved ? "currentColor" : "none"} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 text-gray-600 text-sm font-medium bg-gray-50/80 p-3 rounded-2xl border border-black/5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
            <MapPin size={16} />
          </div>
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600 text-sm font-medium bg-gray-50/80 p-3 rounded-2xl border border-black/5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-secondary shadow-sm">
            <DollarSign size={16} />
          </div>
          <span>{internship.stipend} / month</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {internship.skills.split(',').map((skill, i) => (
          <span key={i} className="text-[11px] font-bold text-gray-500 bg-white border border-black/5 px-3 py-1.5 rounded-xl uppercase tracking-wider">
            {skill.trim()}
          </span>
        ))}
      </div>

      <div className="relative">
        <p className={cn(
          "text-gray-500 text-sm leading-relaxed font-medium transition-all duration-300",
          !isExpanded && "line-clamp-2"
        )}>
          {internship.description}
        </p>
        {internship.description.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-[11px] font-bold mt-2 uppercase tracking-widest hover:underline focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      <button
        onClick={() => onApply(internship.id)}
        className="mt-2 w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all duration-300 shadow-xl shadow-black/5 active:scale-[0.98]"
      >
        Apply for Role
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};
