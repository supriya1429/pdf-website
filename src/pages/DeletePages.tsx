import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

const DeletePages: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageNumber, setPageNumber] = useState("");

  const handleDelete = async () => {
    if (!file || !pageNumber) return;

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);

    pdfDoc.removePage(parseInt(pageNumber) - 1);

    const pdfBytes = await pdfDoc.save();
const uint8Array = new Uint8Array(pdfBytes);
const blob = new Blob([uint8Array], {
  type: "application/pdf"
});


    saveAs(blob, "updated.pdf");
  };

  return (
    <div className="container">
      <h1>Delete PDF Page</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <input
        type="number"
        placeholder="Enter page number"
        onChange={(e) => setPageNumber(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Page</button>
    </div>
  );
};

export default DeletePages;
