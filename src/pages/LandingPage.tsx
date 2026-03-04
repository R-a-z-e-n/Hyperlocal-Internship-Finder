import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, MapPin, ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FC] selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,#4f46e515,transparent_50%)] -z-10" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 blur-[100px] rounded-full -z-10 animate-pulse" />
        <div className="absolute top-60 right-10 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm border border-black/5 text-primary text-sm font-bold mb-10"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/face${i}/50/50`} alt="" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span className="text-gray-400 font-medium">|</span>
              <span>Join 12,000+ students already contributing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-7xl md:text-[10rem] font-display font-bold text-gray-900 tracking-tighter leading-[0.85] mb-10 text-balance"
            >
              Work Where <br />
              <span className="text-primary italic">You Live.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-500 mb-14 max-w-3xl leading-relaxed font-medium"
            >
              The first hyperlocal internship platform designed for the modern student. 
              Find world-class roles within walking distance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="px-12 py-6 bg-gray-900 text-white rounded-[2rem] font-bold text-xl shadow-2xl shadow-black/10 hover:bg-primary hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group"
              >
                Find Opportunities
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-12 py-6 bg-white text-gray-900 rounded-[2rem] font-bold text-xl border border-black/5 shadow-sm hover:bg-gray-50 transition-all">
                Post a Role
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Feature Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">Designed for Impact.</h2>
            <p className="text-gray-500 text-xl">Everything you need to launch your career, locally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bento-card p-12 bg-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <MapPin size={32} />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Hyperlocal Precision</h3>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Our proprietary mapping engine identifies opportunities within your immediate neighborhood, 
                  reducing commute times to zero.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bento-card p-12 bg-gray-900 text-white border-none group">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">Instant Apply</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Apply to multiple roles in seconds with your verified student profile.
              </p>
            </div>

            <div className="md:col-span-4 bento-card p-12 bg-pastel-blue group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                <Shield size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-gray-900">Vetted Hosts</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every company on our platform undergoes a rigorous 12-point quality check.
              </p>
            </div>

            <div className="md:col-span-8 bento-card p-12 bg-white group">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Global Network</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Connect with local branches of global tech giants and innovative startups alike.
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                      <div className="w-full h-4 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Stats Section */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e510,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
                The New Standard for <span className="text-primary italic">Student Success.</span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 leading-relaxed">
                We're not just a job board. We're a community-driven ecosystem 
                redefining how students transition into the professional world.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">50k+</div>
                  <div className="text-gray-500 font-medium">Active Interns</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">500+</div>
                  <div className="text-gray-500 font-medium">Partner Universities</div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-96 aspect-square bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-12 flex flex-col justify-center gap-12">
              <div className="text-center">
                <div className="text-7xl font-display font-bold text-primary mb-2">98%</div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">Match Rate</div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="text-center">
                <div className="text-7xl font-display font-bold text-secondary mb-2">15m</div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">Avg. Commute</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-10">Ready to start?</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-16 py-8 bg-primary text-white rounded-[2.5rem] font-bold text-2xl shadow-2xl shadow-primary/30 hover:bg-primary-dark hover:-translate-y-2 transition-all active:scale-95"
          >
            Launch Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};
