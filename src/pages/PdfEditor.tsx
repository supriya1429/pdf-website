import { useState, ChangeEvent } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleEdit = async () => {
  if (!file) {
    alert("Please upload a PDF first.");
    return;
  }

  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  firstPage.drawText(text, {
    x: 50,
    y: 500,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

// ✅ Create a NEW Uint8Array copy
const safeBytes = new Uint8Array(pdfBytes);

const blob = new Blob([safeBytes], {
  type: "application/pdf",
});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "edited.pdf";
  a.click();
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Editor</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      <input
        type="text"
        placeholder="Enter text to add"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 mt-4 block"
      />

      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Add Text & Download
      </button>
    </div>
  );
}