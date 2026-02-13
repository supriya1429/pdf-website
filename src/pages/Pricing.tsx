import React from "react";
import { PRICING_PLANS } from "../constants";
import { useUser } from "../context/UserContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pricing: React.FC = () => {
  const { isPro, upgradeToPro } = useUser();

  const startRazorpayPayment = async (
    planName: string,
    price: number
  ) => {
    if (planName === "Free") return;

    if (isPro) {
      alert("You are already a Pro member");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        alert("Backend URL not configured.");
        return;
      }

      const res = await fetch(
        `${backendUrl}/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: price }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "PDFMaster",
        description: planName,
        order_id: order.id,
        handler: function () {
          upgradeToPro();
          alert("🎉 Payment successful! Pro unlocked.");
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6">
          Simple Pricing,{" "}
          <span className="text-blue-600">No Surprises</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Start for free, upgrade when you need it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan, idx) => {
          const isActive =
            (plan.name === "Free" && !isPro) ||
            (plan.name !== "Free" && isPro);

          
            return (
  <div style={{ padding: "50px", fontSize: "30px" }}>
    PRICING PAGE WORKING
  </div>
);


export default Pricing;
