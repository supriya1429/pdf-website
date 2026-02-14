// ================= PRICING =================

export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    features: [
      "Basic PDF tools",
      "Limited usage",
      "Community support"
    ],
    buttonText: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    price: 499,
    features: [
      "Unlimited PDF tools",
      "No watermark",
      "Priority support"
    ],
    buttonText: "Upgrade to Pro",
    highlight: true
  }
];


// ================= TOOLS =================

export const TOOLS = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file.",
    path: "/merge"
  },
  {
    title: "Split PDF",
    description: "Split PDF into separate pages.",
    path: "/split"
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size instantly.",
    path: "/compress"
  },
  {
    title: "PDF to Word",
    description: "Convert PDF to editable Word document.",
    path: "/pdf-to-word"
  },
  {
    title: "Word to PDF",
    description: "Convert Word files to PDF format.",
    path: "/word-to-pdf"
  }
];
