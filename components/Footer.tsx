
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-xs">P</div>
              <span className="font-bold text-lg">PDFMaster</span>
            </div>
            <p className="text-sm">
              The fastest, most secure way to manage your PDF documents entirely in your browser.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Merge PDF</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Split PDF</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Image to PDF</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AI Summary</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Secure</h4>
            <p className="text-sm mb-4">Your files never leave your device. We use local browser processing for maximum privacy.</p>
            <div className="flex space-x-4">
              {/* Social icons */}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} PDFMaster SaaS. Built for speed and security.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
