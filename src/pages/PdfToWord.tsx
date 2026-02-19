import React from 'react';

const PdfToWord: React.FC = () => {
  return (
    <div className="container">
      <h1>PDF to Word</h1>
      <p>Convert PDF to editable Word document.</p>
      <input type="file" accept="application/pdf" />
      <button className="btn">Convert</button>
    </div>
  );
};

export default PdfToWord;
