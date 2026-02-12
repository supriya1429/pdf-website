import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // load .env

const app = express(); // ✅ app MUST be defined before use

app.use(cors());
app.use(express.json());

// Debug (temporary)
console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log(
  "KEY SECRET:",
  process.env.RAZORPAY_KEY_SECRET ? "LOADED" : "MISSING"
);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Test route
app.get("/", (req, res) => {
  res.send("Razorpay server running");
});

// Create order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "pdfmaster_receipt",
    });

    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Razorpay server running on http://localhost:5000");
});
