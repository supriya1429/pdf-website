import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const WatermarkPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const handleWatermark = async () => {
    if (!file || !text) return;

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
      page.drawText(text, {
        x: 50,
        y: 300,
        size: 40,
        color: rgb(0.75, 0.75, 0.75),
        opacity: 0.5
      });
    });

    const pdfBytes = await pdfDoc.save();
const uint8Array = new Uint8Array(pdfBytes);
const blob = new Blob([uint8Array], {
  type: "application/pdf"
});

    saveAs(blob, "watermarked.pdf");
  };

  return (
    <div className="container">
      <h1>Add Watermark</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Watermark text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleWatermark}>Add Watermark</button>
    </div>
  );
};

export default WatermarkPdf;

