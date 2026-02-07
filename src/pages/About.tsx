import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About PDFMaster</h1>

      <p className="mb-4">
        PDFMaster is a privacy-first online platform offering fast and simple PDF
        tools such as merge, split, image-to-PDF, and AI-powered summaries.
      </p>

      <p className="mb-4">
        Our mission is to provide powerful PDF utilities that work directly in
        your browser without uploading your files to any server.
      </p>

      <p>
        Built for speed, security, and simplicity — PDFMaster helps you get work
        done effortlessly.
      </p>
    </div>
  );
};

export default About;
