
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFashionAdvice(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class fashion stylist for Vogue & Verve. Provide concise, trendy, and sophisticated fashion advice. Keep answers under 3 sentences.",
      }
    });
    return response.text || "I'm sorry, I couldn't generate fashion advice at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our stylist is currently busy, please try again later!";
  }
}

export async function generateProductDescription(productName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a luxury fashion description for a product named "${productName}". Focus on quality, craftsmanship, and style.`,
      config: {
        systemInstruction: "You are a creative copywriter for a high-end fashion brand.",
      }
    });
    return response.text || "Premium quality and elegant design.";
  } catch (error) {
    return "Elegant craftsmanship meets modern style.";
  }
}
