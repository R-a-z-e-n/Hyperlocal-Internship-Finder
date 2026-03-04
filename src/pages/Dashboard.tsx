import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { Internship } from '../types';
import { InternshipCard } from '../components/InternshipCard';
import { SearchBar } from '../components/SearchBar';
import { motion, AnimatePresence } from 'motion/react';
import { X, Map as MapIcon, List, Sparkles, ArrowRight, MapPin, LayoutGrid } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fix for default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

export const Dashboard: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]);

  const fetchInternships = async (filters?: { role: string; skill: string; location: string }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters?.role) params.append('role', filters.role);
      if (filters?.skill) params.append('skill', filters.skill);
      if (filters?.location) params.append('location', filters.location);
      
      const res = await fetch(`/api/internships?${params.toString()}`);
      const data = await res.json();
      setInternships(data);
      if (data.length > 0) {
        setMapCenter([data[0].lat, data[0].lng]);
      }
    } catch (error) {
      console.error('Failed to fetch internships', error);
    } finally {
      setLoading(false);
    }
  };

  const [recommendations, setRecommendations] = useState<Internship[]>([]);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch('/api/recommend');
      const data = await res.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
    }
  };

  useEffect(() => {
    fetchInternships();
    fetchRecommendations();
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
        const { saved } = await res.json();
        setInternships(prev => prev.map(i => i.id === id ? { ...i, isSaved: saved } : i));
        setRecommendations(prev => prev.map(i => i.id === id ? { ...i, isSaved: saved } : i));
        if (selectedInternship?.id === id) {
          setSelectedInternship(prev => prev ? { ...prev, isSaved: saved } : null);
        }
      }
    } catch (error) {
      console.error('Failed to toggle save', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] pt-24 pb-20 md:pb-12">
      {/* Header Section */}
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
              Find Your <span className="text-primary italic">Next Move.</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Explore {internships.length} curated hyperlocal internships designed specifically for your skill set and location.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <SearchBar onSearch={fetchInternships} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Recommendations */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Sparkles className="text-primary" /> Recommended for You
              </h3>
              <p className="text-gray-500">Based on your recent searches and profile.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((internship) => (
              <InternshipCard 
                key={`rec-${internship.id}`} 
                internship={internship} 
                onApply={handleApply} 
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-display font-bold text-gray-900">All Opportunities</h3>
          <div className="flex bg-white p-1.5 rounded-2xl border border-black/5 shadow-sm">
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                "flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold transition-all",
                viewMode === 'map' ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <MapIcon size={18} /> Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold transition-all",
                viewMode === 'list' ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <List size={18} /> List
            </button>
          </div>
        </div>

        <div className="relative h-[800px] rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl bg-white group">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-30">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="font-bold text-gray-900">Updating Results...</span>
              </div>
            </div>
          )}

          {viewMode === 'map' ? (
            <MapContainer center={mapCenter} zoom={13} className="h-full w-full z-0">
              <ChangeView center={mapCenter} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MarkerClusterGroup
                chunkedLoading
                maxClusterRadius={60}
              >
                {internships.map((internship) => (
                  <Marker
                    key={internship.id}
                    position={[internship.lat, internship.lng]}
                    eventHandlers={{
                      click: () => setSelectedInternship(internship),
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2 min-w-[150px]">
                        <h4 className="font-display font-bold text-gray-900">{internship.role}</h4>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">{internship.company}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          ) : (
            <div className="h-full overflow-y-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray-50/30">
              {internships.map((internship) => (
                <InternshipCard 
                  key={internship.id} 
                  internship={internship} 
                  onApply={handleApply} 
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}

          <AnimatePresence>
            {selectedInternship && viewMode === 'map' && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-white/90 backdrop-blur-xl shadow-2xl z-10 p-8 border-l border-black/5 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-display font-bold">Internship Details</h3>
                  <button
                    onClick={() => setSelectedInternship(null)}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>
                <InternshipCard 
                  internship={selectedInternship} 
                  onApply={handleApply} 
                  onToggleSave={handleToggleSave}
                />
                
                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">About the Role</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedInternship.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.split(',').map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-pastel-blue text-primary rounded-lg text-sm font-medium">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
