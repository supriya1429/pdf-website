
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useUser();
  
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        login(email);
      } else {
        signup(email, name || email.split('@')[0]);
      }
      setIsLoading(false);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-xl shadow-blue-500/30 hover:scale-105 transition-transform">
              P
            </div>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-slate-500">
            {isLogin 
              ? 'Log in to manage your PDFs and access Pro features.' 
              : 'Join thousands of users managing PDFs securely.'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/60 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full"></div>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all ${
                  isLoading 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25 active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white/30 border-t-white rounded-full" viewBox="0 0 24 24"></svg>
                    Processing...
                  </span>
                ) : (isLogin ? 'Log In' : 'Get Started Free')}
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="h-px bg-slate-100 flex-grow"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">or continue with</span>
            <div className="h-px bg-slate-100 flex-grow"></div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3.5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.211-1.801 4.102-1.121 1.121-2.88 2.432-5.919 2.432-4.8 0-8.73-3.89-8.73-8.69s3.93-8.69 8.73-8.69c2.43 0 4.24 1.05 5.51 2.22l2.31-2.31c-1.99-1.95-4.6-3.14-7.82-3.14-6.42 0-11.77 5.17-11.77 11.53s5.35 11.53 11.77 11.53c3.47 0 6.09-1.14 8.08-3.21 2.08-2.08 2.73-4.99 2.73-7.39 0-.69-.05-1.34-.14-1.94H12.48z" fill="#4285F4"/></svg>
              <span className="text-sm font-bold text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3.5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
              <span className="text-sm font-bold text-slate-700">GitHub</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
          <Link 
            to={isLogin ? "/signup" : "/login"}
            className="font-black text-blue-600 hover:text-blue-700 transition-all underline decoration-blue-200 underline-offset-4"
          >
            {isLogin ? 'Sign up for free' : 'Log in here'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
