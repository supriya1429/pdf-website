import React from 'react';
import { PRICING_PLANS } from '../constants';
import { useUser } from '../context/UserContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pricing: React.FC = () => {
  const { isPro, upgradeToPro } = useUser();

  const startRazorpayPayment = async (planName: string, price: number) => {
    if (planName === 'Free') return;

    if (isPro) {
      alert('You are already a Pro member');
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: price })
        }
      );

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'PDFMaster',
        description: planName,
        order_id: order.id,
        handler: function () {
          upgradeToPro();
          alert('🎉 Payment successful!');
        },
        theme: { color: '#2563eb' }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert('Payment failed.');
    }
  };

  return (
    <div>
      {/* Your JSX */}
    </div>
  );
};

export default Pricing;
