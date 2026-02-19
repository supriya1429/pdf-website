import React from 'react';

const CompressPdf: React.FC = () => {
  return (
    <div className="container">
      <h1>Compress PDF</h1>
      <p>Reduce your PDF file size easily.</p>
      <input type="file" accept="application/pdf" />
      <button className="btn">Compress</button>
    </div>
  );
};

export default CompressPdf;
