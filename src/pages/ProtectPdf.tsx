import React from 'react';

const ProtectPdf: React.FC = () => {
  return (
    <div className="container">
      <h1>Protect PDF</h1>
      <p>Add password protection to your PDF.</p>
      <input type="file" accept="application/pdf" />
      <input type="password" placeholder="Enter password" />
      <button className="btn">Protect</button>
    </div>
  );
};

export default ProtectPdf;
