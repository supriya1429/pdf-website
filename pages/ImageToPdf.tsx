
import React, { useState } from 'react';
import { imagesToPdf, downloadBlob } from '../lib/pdfUtils';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ImageToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { incrementUsage, actionsLeft } = useUser();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    
    if (actionsLeft <= 0) {
      alert("You have reached your free daily limit. Upgrade to Pro for unlimited actions!");
      navigate('/pricing');
      return;
    }

    setIsProcessing(true);
    try {
      const pdfBytes = await imagesToPdf(files);
      downloadBlob(pdfBytes, 'converted_images.pdf', 'application/pdf');
      incrementUsage();
    } catch (error) {
      console.error(error);
      alert('Failed to convert images.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Image to PDF</h1>
        <p className="text-lg text-slate-600">Convert JPG, PNG, and BMP images to PDF in one click.</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        {files.length === 0 ? (
          <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-16 text-center hover:border-blue-400 transition-all cursor-pointer group bg-slate-50/50">
            <input type="file" multiple accept="image/*" className="hidden" id="img-upload" onChange={handleFileChange} />
            <label htmlFor="img-upload" className="cursor-pointer block">
              <div className="text-6xl mb-6">🖼️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Drag images here</h3>
              <p className="text-slate-500 mb-6">Support JPG, PNG, BMP</p>
              <span className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold group-hover:bg-blue-700 transition-all inline-block shadow-lg shadow-blue-500/30">
                Select Images
              </span>
            </label>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {files.map((file, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] disabled:bg-slate-200"
            >
              {isProcessing ? 'Processing...' : `Convert ${files.length} Images to PDF`}
            </button>
          </div>
        )}
      </div>

      <article className="mt-20 prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">How to convert images to PDF</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2 underline decoration-blue-200 underline-offset-4">Why use our tool?</h3>
            <p className="text-slate-600 leading-relaxed">
              Unlike other online converters, <strong>PDFMaster</strong> processes your images directly in your browser. This means your private photos never touch a cloud server. It's the most secure way to convert JPG to PDF on the web today.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold mb-4">Common Questions</h3>
            <ul className="space-y-4">
              <li>
                <span className="font-bold block text-slate-800">Is there a file size limit?</span>
                <span className="text-sm text-slate-600">Free users can convert up to 5MB total. Pro users have no limits.</span>
              </li>
              <li>
                <span className="font-bold block text-slate-800">Which formats are supported?</span>
                <span className="text-sm text-slate-600">We support JPG, JPEG, PNG, and BMP.</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ImageToPdf;
