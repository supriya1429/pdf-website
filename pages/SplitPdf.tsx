
import React, { useState } from 'react';
import { splitPdf, downloadBlob } from '../lib/pdfUtils';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SplitPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { incrementUsage, actionsLeft } = useUser();
  const navigate = useNavigate();

  const handleSplit = async () => {
    if (!file) return;
    if (actionsLeft <= 0) {
      alert("Daily limit reached. Upgrade to Pro!");
      navigate('/pricing');
      return;
    }

    setIsProcessing(true);
    try {
      // Split the first page as a demonstration
      const pdfBytes = await splitPdf(file, 0);
      downloadBlob(pdfBytes, `split_page_1_${file.name}`, 'application/pdf');
      incrementUsage();
    } catch (error) {
      alert("Error splitting PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Split PDF</h1>
        <p className="text-lg text-slate-600">Extract pages or split a PDF into several documents.</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        {!file ? (
          <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-16 text-center hover:border-blue-400 transition-all cursor-pointer group bg-slate-50/50">
            <input type="file" accept=".pdf" className="hidden" id="split-upload" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <label htmlFor="split-upload" className="cursor-pointer block">
              <div className="text-6xl mb-6">✂️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select the PDF to Split</h3>
              <p className="text-slate-500 mb-6">Process entirely in your browser</p>
              <span className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold group-hover:bg-blue-700 transition-all inline-block">
                Choose PDF
              </span>
            </label>
          </div>
        ) : (
          <div className="text-center">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-10 flex items-center justify-center space-x-4">
               <span className="text-3xl">📄</span>
               <div className="text-left">
                 <p className="font-bold text-slate-900">{file.name}</p>
                 <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(0)} KB</p>
               </div>
               <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>
            <button
              onClick={handleSplit}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 disabled:bg-slate-200"
            >
              {isProcessing ? 'Extracting...' : 'Extract First Page'}
            </button>
            <p className="mt-4 text-xs text-slate-400">Pro users can select custom page ranges and split all pages into separate files.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitPdf;
