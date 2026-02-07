
import React from 'react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one single document easily.',
    icon: '📄➕📄',
    href: '/merge-pdf'
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, and BMP images to PDF format instantly.',
    icon: '🖼️➡️📄',
    href: '/image-to-pdf'
  },
  {
    id: 'split',
    name: 'Split PDF',
    description: 'Separate one page or a whole set for easy conversion.',
    icon: '✂️📄',
    href: '/split-pdf',
    badge: 'Popular'
  },
  {
    id: 'ai-summary',
    name: 'AI Summarize',
    description: 'Use Gemini AI to get instant insights from long PDF documents.',
    icon: '🤖📑',
    href: '/ai-summarize',
    badge: 'Pro'
  }
];

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '0',
    features: [
      '3 actions per day',
      'Max 2 files per merge',
      'Basic PDF tools',
      'Community support'
    ],
    buttonText: 'Current Plan',
    current: true
  },
  {
    name: 'Pro Monthly',
    price: '299',
    features: [
      'Unlimited actions',
      'Unlimited file merging',
      'No watermarks',
      'AI PDF Summaries',
      'Priority support'
    ],
    buttonText: 'Go Pro',
    current: false,
    highlight: true
  },
  {
    name: 'Pro Yearly',
    price: '1999',
    features: [
      'All Pro features',
      'Save 45% annually',
      'Early access to features',
      'Dedicated manager'
    ],
    buttonText: 'Best Value',
    current: false
  }
];
