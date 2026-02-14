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
        alert("Backend URL not configured");
        return;
      }

      const res = await fetch(`${backendUrl}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price }),
      });

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
      console.error("Payment Error:", error);
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
        {PRICING_PLANS &&
          PRICING_PLANS.map((plan, idx) => {
            const isActive =
              (plan.name === "Free" && !isPro) ||
              (plan.name !== "Free" && isPro);

            return (
              <div
                key={idx}
                className={`p-10 rounded-3xl border ${
                  plan.highlight
                    ? "bg-blue-600 text-white border-blue-600 scale-105"
                    : "bg-white text-slate-900 border-slate-200"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">
                  {plan.name}
                </h3>

                <div className="text-5xl font-black mb-6">
                  ₹{plan.price}
                  <span className="text-base font-medium">
                    {" "}
                    / year
                  </span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3"
                    >
                      ✅ <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isActive}
                  onClick={() =>
                    startRazorpayPayment(
                      plan.name,
                      Number(plan.price)
                    )
                  }
                  className={`w-full py-4 rounded-xl font-bold text-lg ${
                    isActive
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : plan.highlight
                      ? "bg-white text-blue-600"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  {isActive
                    ? "Active Plan"
                    : plan.buttonText}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Pricing;
