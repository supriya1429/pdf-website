
import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { isLoggedIn, userEmail, userName, isPro, actionsLeft } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const history = [
    { name: 'resume_v2.pdf', type: 'Merge', date: 'Oct 24, 2023', size: '1.2 MB' },
    { name: 'tax_forms_2023.pdf', type: 'Split', date: 'Oct 22, 2023', size: '4.5 MB' },
    { name: 'presentation_draft.pdf', type: 'Image-to-PDF', date: 'Oct 15, 2023', size: '8.1 MB' },
  ];

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Welcome Back, {userName || userEmail?.split('@')[0]}</h1>
        <p className="text-slate-600 font-medium">Manage your documents and plan settings for {userEmail}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plan Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Current Plan</h3>
            <div className="flex items-center justify-between mb-6">
              <span className={`text-2xl font-black ${isPro ? 'text-indigo-600' : 'text-blue-600'}`}>
                {isPro ? 'Pro Member' : 'Free Tier'}
              </span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Active</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500 font-bold">Daily Actions</span>
                  <span className="text-slate-900 font-black">
                    {isPro ? '∞' : `${Math.max(0, 3 - (typeof actionsLeft === 'number' ? actionsLeft : 0))}/3`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${isPro ? 'bg-indigo-600 w-full' : 'bg-blue-600'}`} 
                    style={{ width: isPro ? '100%' : `${((3 - (typeof actionsLeft === 'number' ? actionsLeft : 3)) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            {!isPro && (
              <button 
                onClick={() => navigate('/pricing')}
                className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                Upgrade to Pro
              </button>
            )}
            {isPro && (
              <p className="mt-8 text-center text-xs font-bold text-slate-400">Your Pro plan renews on Nov 24, 2024</p>
            )}
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">🔒</span>
              <h3 className="font-black text-xl">Security Tip</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your security is our priority. Since all processing happens locally in your browser, even we can't see your document content.
            </p>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900 text-lg">Recent Activity</h3>
              <button className="text-blue-600 text-sm font-black hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-8 py-4">Filename</th>
                    <th className="px-8 py-4">Type</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold text-slate-900">{item.name}</td>
                      <td className="px-8 py-5">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{item.type}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500">{item.date}</td>
                      <td className="px-8 py-5 text-sm text-slate-500 text-right font-mono">{item.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {history.length === 0 && (
              <div className="p-16 text-center text-slate-400">
                <div className="text-5xl mb-4">📂</div>
                <p className="font-bold">No documents processed yet.</p>
                <button 
                  onClick={() => navigate('/')}
                  className="mt-4 text-blue-600 font-black hover:underline"
                >
                  Start your first task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
