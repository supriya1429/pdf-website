
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const UsageBanner: React.FC = () => {
  const { isPro, actionsLeft } = useUser();

  if (isPro) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-slate-700">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Free Actions</span>
          <span className="text-sm font-bold">{actionsLeft} remaining today</span>
        </div>
        <div className="h-8 w-px bg-slate-700"></div>
        <Link 
          to="/pricing" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          Go Pro
        </Link>
      </div>
    </div>
  );
};

export default UsageBanner;
