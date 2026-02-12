export const payWithRazorpay = async (amount: number) => {
  // 1️⃣ Create order from backend
  const res = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const order = await res.json();

  // 2️⃣ Open Razorpay checkout
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // PUBLIC key
    amount: order.amount,
    currency: "INR",
    name: "PDFMaster Pro",
    description: "Unlock Pro Features",
    order_id: order.id,
    handler: function (response: any) {
      alert("✅ Payment Successful!");
      console.log(response);
      // TODO: mark user as Pro
    },
    theme: {
      color: "#2563eb",
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};
