import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real production app, API calls should proxy through a backend to protect the key.
const apiKey = process.env.API_KEY || 'mock-key'; 
const ai = new GoogleGenAI({ apiKey });

export const summarizeNote = async (text: string): Promise<string> => {
  if (!process.env.API_KEY) {
    // Fallback for demo if no key is present
    return new Promise(resolve => setTimeout(() => resolve("This is a simulated summary. Please configure a valid Gemini API Key to get real-time summarization logic."), 1000));
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following note into a concise, actionable bullet point list suitable for a mixed reality heads-up display. Keep it under 50 words.\n\nNote Content:\n${text}`,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please try again.";
  }
};

export const analyzeRoomLayout = async (anchorData: string): Promise<string> => {
    if (!process.env.API_KEY) return "AI analysis unavailable without API Key.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `I have a room layout with the following spatial anchors: ${anchorData}. Suggest the best location for a "Deep Work" holographic task board and a "Relax" ambient orb.`,
        });
        return response.text || "Analysis failed.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error analyzing room.";
    }
}
