
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UsageBanner from './components/UsageBanner';
import Home from './pages/Home';
import MergePdf from './pages/MergePdf';
import ImageToPdf from './pages/ImageToPdf';
import SplitPdf from './pages/SplitPdf';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import AiSummary from './pages/AiSummary';
import Auth from './pages/Auth';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/merge-pdf" element={<MergePdf />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />
              <Route path="/split-pdf" element={<SplitPdf />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-summarize" element={<AiSummary />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <UsageBanner />
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
