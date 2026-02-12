
import React, { useState } from 'react';
import { mergePdfs, downloadBlob } from '../lib/pdfUtils';
import AdBlock from "../components/AdBlock";

const MergePdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const mergedBytes = await mergePdfs(files);
      downloadBlob(mergedBytes, 'merged_document.pdf', 'application/pdf');
    } catch (error) {
      console.error('Merge error:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Merge PDF Files
        </h1>
        <p className="text-slate-600">
          Combine multiple PDFs into one document in seconds.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        {files.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer group">
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              id="pdf-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Select PDF Files
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                or drag and drop them here
              </p>
              <span className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold group-hover:bg-blue-700 transition-colors inline-block">
                Choose Files
              </span>
            </label>
          </div>
        ) : (
          <div>
            <div className="space-y-3 mb-8">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📄</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 truncate max-w-xs">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 🔥 HIGH-CTR ADSENSE AD */}
            <AdBlock />

            <button
              onClick={handleMerge}
              disabled={isProcessing || files.length < 2}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                isProcessing || files.length < 2
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25 active:scale-95'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-2 border-white/30 border-t-white rounded-full"
                    viewBox="0 0 24 24"
                  />
                  Merging Files...
                </span>
              ) : (
                `Merge ${files.length} PDFs`
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 text-slate-500 text-sm text-center">
        <p className="mb-4 font-semibold uppercase tracking-widest">
          How it works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-blue-600 mb-1">Step 1</div>
            <p>Upload files by selecting the PDFs you want to merge.</p>
          </div>
          <div>
            <div className="font-bold text-blue-600 mb-1">Step 2</div>
            <p>Order the files by removing and re-adding them as needed.</p>
          </div>
          <div>
            <div className="font-bold text-blue-600 mb-1">Step 3</div>
            <p>Download your combined PDF document instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergePdf;
