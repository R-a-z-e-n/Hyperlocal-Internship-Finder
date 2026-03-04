import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Bookmark, Settings, MapPin, Menu, X as CloseIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/saved', icon: Bookmark, label: 'Saved' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-2xl border-b border-black/5 px-6 md:px-12 py-5 flex justify-between items-center z-50">
        <div className="flex items-center gap-3 text-gray-900 font-display font-bold text-xl md:text-2xl tracking-tighter">
          <div className="bg-primary w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <MapPin size={20} className="md:size-[24px]" />
          </div>
          <span>Hyperlocal</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center bg-gray-100/50 p-1 rounded-2xl border border-black/5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-gray-500 hover:text-gray-900"
                )
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-black/5 active:scale-95">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {isOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-0 right-0 bg-white border-b border-black/5 shadow-xl z-40 md:hidden p-6 space-y-4"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all",
                    isActive ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"
                  )
                }
              >
                <item.icon size={20} />
                <span className="font-bold">{item.label}</span>
              </NavLink>
            ))}
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold mt-4">
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
