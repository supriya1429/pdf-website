
import { GoogleGenAI, Type } from "@google/genai";

export async function summarizePdfContent(text: string) {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please provide a concise summary of the following PDF text content. Focus on key insights and main points: \n\n ${text.substring(0, 10000)}`, // Truncate for token limits
    config: {
      systemInstruction: "You are a professional document analyst. Summarize clearly and objectively.",
      temperature: 0.7,
    },
  });

  return response.text;
}
