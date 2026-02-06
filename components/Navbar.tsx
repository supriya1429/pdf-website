
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout, isPro } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                PDFMaster
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Tools</Link>
            <Link to="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
            )}
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
              )}
              
              {!isPro && (
                <Link to="/pricing" className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                  Go Pro
                </Link>
              )}
              {isPro && isLoggedIn && (
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Pro Member
                </span>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-slate-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
