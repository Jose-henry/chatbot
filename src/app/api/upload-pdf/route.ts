// src/app/api/upload-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const pdfFile = formData.get('pdf') as File;

  if (!pdfFile) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const loader = new PDFLoader(new Blob([arrayBuffer]));
    const docs = await loader.load();
    const text = docs.map((doc:any) => doc.pageContent).join('\n');

    return NextResponse.json({ text }, { status: 200 });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: 'Error processing PDF' }, { status: 500 });
  }
}
