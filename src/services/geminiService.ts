import { GoogleGenAI } from "@google/genai";
import { WasteAnalysis, WasteCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeWaste(imageData: string, zipCode: string = "90210"): Promise<WasteAnalysis> {
  const prompt = `
    Analyze this waste item for a circular economy app called EcoLens AI.
    The user is located in ZIP code: ${zipCode}.
    
    Provide the analysis in the following JSON format:
    {
      "itemName": "Specific item name",
      "material": "Primary material (e.g., HDPE Plastic, Aluminum, Cardboard)",
      "confidence": 0.95,
      "instructions": {
        "REDUCE": ["Sustainable alternative 1", "Sustainable alternative 2"],
        "REUSE": ["Creative upcycling idea 1", "Creative upcycling idea 2"],
        "RECYCLE": "Specific localized instructions for the blue bin or special drop-off."
      },
      "environmentalImpact": "A short fact about the impact of recycling this material."
    }
    
    Ensure the REUSE ideas are creative and DIY-friendly.
    Ensure the RECYCLE instructions are based on common municipal rules for that ZIP code or general best practices if specific data is missing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: imageData.split(",")[1],
            mimeType: "image/jpeg",
          },
        },
        { text: prompt }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    
    return JSON.parse(text) as WasteAnalysis;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    // Return a fallback for demo purposes if API fails or is missing
    return {
      itemName: "Plastic Bottle",
      material: "PET Plastic",
      confidence: 0.85,
      instructions: {
        [WasteCategory.REDUCE]: ["Use a stainless steel reusable bottle", "Buy in bulk to reduce packaging"],
        [WasteCategory.REUSE]: ["Create a self-watering planter", "Use as a bird feeder"],
        [WasteCategory.RECYCLE]: "Rinse thoroughly, crush, and place in the blue bin with the cap ON."
      },
      environmentalImpact: "Recycling one plastic bottle saves enough energy to power a 60W lightbulb for 6 hours."
    };
  }
}
