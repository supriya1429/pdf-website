
import React, { useEffect } from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../constants';

const Home: React.FC = () => {

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('Adsense error', e);
    }
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-20 pb-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Every PDF Tool You Need, <span className="text-blue-600">Completely Private</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Fast, secure, and browser-native. We never upload your files to our servers.
          </p>
        </div>
      </section>

      {/* 🔥 ADSENSE HOME TOP BANNER */}
      <div className="max-w-4xl mx-auto px-4 mb-12 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5287789310440199"
          data-ad-slot="9209945330"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Tools Grid */}
      <section id="tools" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Most Popular Tools
            </h2>
            <p className="text-slate-600">
              Simplified workflows for your daily document tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">🔒</div>
              <h3 className="text-xl font-bold mb-3">100% Privacy</h3>
              <p className="text-slate-600 text-sm">
                Processing happens locally in your browser.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">⚡</div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-600 text-sm">
                Instantly process large files with ease.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">🆓</div>
              <h3 className="text-xl font-bold mb-3">Free to Start</h3>
              <p className="text-slate-600 text-sm">
                Essential tools are free for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
