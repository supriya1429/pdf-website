export const payWithRazorpay = async (amount: number) => {
  try {
    const res = await fetch(
      "https://pdfmaster-backend-b5zm.onrender.com/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
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
      name: "PDFMaster Pro",
      description: "Unlock Pro Features",
      order_id: order.id,
      handler: function (response: any) {
        alert("✅ Payment Successful!");
        console.log("Payment response:", response);
        localStorage.setItem("pdf_is_pro", "true");
      },
      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("❌ Payment failed. Please try again.");
  }
};
