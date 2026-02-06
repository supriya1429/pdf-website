
declare const PDFLib: any;

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const { PDFDocument } = PDFLib;
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page: any) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

export async function imagesToPdf(imageFiles: File[]): Promise<Uint8Array> {
  const { PDFDocument } = PDFLib;
  const pdfDoc = await PDFDocument.create();

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      continue;
    }

    const { width, height } = image.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });
  }

  return await pdfDoc.save();
}

export async function splitPdf(file: File, pageIndex: number): Promise<Uint8Array> {
  const { PDFDocument } = PDFLib;
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  const newPdf = await PDFDocument.create();
  const [copiedPage] = await newPdf.copyPages(pdf, [pageIndex]);
  newPdf.addPage(copiedPage);

  return await newPdf.save();
}

export function downloadBlob(data: Uint8Array, fileName: string, mimeType: string) {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
}
