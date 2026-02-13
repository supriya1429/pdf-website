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
        alert('🎉 Payment successful! Pro unlocked.');
      },
      theme: { color: '#2563eb' }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error(error);
    alert('Payment failed. Please try again.');
  }
};
