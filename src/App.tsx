import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SavedPage } from './pages/SavedPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/settings" element={<div className="pt-24 px-6 text-center text-gray-500">Settings feature coming soon!</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
