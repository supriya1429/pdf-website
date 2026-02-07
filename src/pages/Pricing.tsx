
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { useUser } from '../context/UserContext';

const Pricing: React.FC = () => {
  const { isPro, upgradeToPro } = useUser();

  const handleUpgrade = (planName: string) => {
    if (planName === 'Free') return;
    if (isPro) {
      alert("You are already a Pro member!");
      return;
    }
    
    // Simulate Stripe Checkout Redirect
    const confirmed = window.confirm(`Proceed to payment for ${planName}? (Simulated Stripe Flow)`);
    if (confirmed) {
      upgradeToPro();
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Simple Pricing, <span className="text-blue-600">No Surprises</span>.</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Start for free, upgrade when you need it. Trusted by 10,000+ users worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {PRICING_PLANS.map((plan, idx) => {
          const isPlanActive = (plan.name === 'Free' && !isPro) || (plan.name !== 'Free' && isPro);
          
          return (
            <div 
              key={idx} 
              className={`relative flex flex-col p-10 rounded-[2rem] border transition-all duration-500 ${
                plan.highlight 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-500/30 scale-105 z-10' 
                  : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400 hover:shadow-xl'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-blue-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  Best Seller
                </span>
              )}
              
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-4 ${plan.highlight ? 'text-blue-100' : 'text-slate-500'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-5xl font-black">₹{plan.price}</span>
                  <span className={plan.highlight ? 'text-blue-100' : 'text-slate-500'}>/year</span>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-4">
                    <svg className={`w-6 h-6 flex-shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-semibold text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleUpgrade(plan.name)}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 ${
                  plan.highlight 
                    ? 'bg-white text-blue-600 hover:bg-slate-50 shadow-white/20' 
                    : isPlanActive
                    ? 'bg-slate-100 text-slate-400 cursor-default shadow-none'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isPlanActive ? 'Active Plan' : plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* SEO FAQ Section */}
      <section className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-3">Can I cancel anytime?</h4>
            <p className="text-slate-600">Yes! You can cancel your subscription from your dashboard with a single click. No hidden contracts.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Is my data secure?</h4>
            <p className="text-slate-600">100%. Our "Local Processing" technology ensures that your sensitive documents never leave your browser.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">What happens if I reach the free limit?</h4>
            <p className="text-slate-600">You'll be asked to wait 24 hours or upgrade to a Pro plan for instant, unlimited access.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Do you offer educational discounts?</h4>
            <p className="text-slate-600">Absolutely. Students and teachers get 50% off yearly plans. Contact support with your .edu email.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
