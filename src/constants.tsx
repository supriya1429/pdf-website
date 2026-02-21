
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
    description: 'Convert JPG and PNG images to PDF format instantly.',
    icon: '🖼️➡️📄',
    href: '/image-to-pdf'
  },
  {
    id: 'split',
    name: 'Split PDF',
    description: 'Separate one page or a whole set easily.',
    icon: '✂️📄',
    href: '/split-pdf',
    badge: 'Popular'
  },
  {
  id: 'ai-summary',
  name: 'AI Summarize',
  description: 'Use AI to generate quick summaries from PDF documents.',
  icon: '🤖📑',
  href: '/ai-summarize',
  badge: 'Pro'
},

  {
    id: 'rotate',
    name: 'Rotate PDF',
    description: 'Rotate all pages in your PDF file.',
    icon: '🔄📄',
    href: '/rotate-pdf'
  },
  {
    id: 'delete-pages',
    name: 'Delete Pages',
    description: 'Remove specific pages from your PDF.',
    icon: '🗑️📄',
    href: '/delete-pages'
  },
  {
    id: 'watermark',
    name: 'Add Watermark',
    description: 'Add text watermark to your PDF document.',
    icon: '💧📄',
    href: '/watermark-pdf'
  },
  {
    id: 'pdf-editor',
    name: 'PDF Editor',
    description: 'Edit PDF files by adding text.',
    icon: '✏️📄',
    href: '/pdf-editor'
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

export const FREE_LIMITS = {
  mergePdf: 2,
  splitPdf: 2,
  imageToPdf: 2,
  rotatePdf: 2,
  deletePages: 2,
  watermarkPdf: 1,
  pdfEditor: 1,
  aiSummary: 1
};
