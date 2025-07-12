import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;

  // جلب البيانات من قاعدة البيانات بناءً على اللغة
  const data = await fetchFromDatabase(lang as string);

  res.status(200).json(data);
}

// Define example page content for English and Arabic
const englishPageContent = {
  title: "Welcome",
  body: "This is the English content."
};

const arabicPageContent = {
  title: "مرحبا",
  body: "هذا هو المحتوى العربي."
};

async function fetchFromDatabase(lang: string) {
  // استعلام لجلب البيانات بناءً على اللغة
  return {
  
    pageContent: lang === 'en' ? englishPageContent : arabicPageContent,
  };
}
