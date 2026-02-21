import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";

const RotatePdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleRotate = async () => {
    if (!file) return;

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
      page.setRotation(degrees(90));
    });

    const pdfBytes = await pdfDoc.save();
const uint8Array = new Uint8Array(pdfBytes);
const blob = new Blob([uint8Array], {
  type: "application/pdf"
});


    saveAs(blob, "rotated.pdf");
  };

  return (
    <div className="container">
      <h1>Rotate PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleRotate}>Rotate 90°</button>
    </div>
  );
};

export default RotatePdf;

