import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeNote = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following note into a concise, actionable bullet point list suitable for a mixed reality heads-up display. Keep it under 50 words.\n\nNote Content:\n${text}`,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please check your API key configuration.";
  }
};

export const extractTasks = async (text: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Extract a list of actionable tasks from the following note. Return ONLY a valid JSON string array (e.g., ["Task 1", "Task 2"]). Do not include markdown code blocks.\n\nNote:\n${text}`,
        });

        const rawText = response.text || "[]";
        const jsonStr = rawText.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Task Extraction Error:", error);
        return [];
    }
}

export const analyzeRoomLayout = async (anchorData: string): Promise<any> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an interior AI architect for a productivity mixed reality app. 
            I have a room layout with the following spatial anchors: ${anchorData}. 
            
            Determine the optimal placement for these holograms:
            1. "Main Board" (Task Board) - Needs a large Wall.
            2. "Timeline" - Needs a Table/Desk.
            3. "Focus Sphere" - Needs an Open Space.
            
            Return a JSON object with a "placements" array. Each item should have:
            - name: string
            - type: "Board" | "Timeline" | "Sphere"
            - parentAnchorId: string (id of the anchor to place on)
            - reason: string
            
            Do not wrap in markdown.`,
            config: {
                responseMimeType: "application/json"
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { placements: [] };
    }
}

export const getCoachInsights = async (stats: any): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Act as a productivity coach. Based on these user stats: ${JSON.stringify(stats)}, provide a brief, motivating insight or tip (max 2 sentences) to help them improve focus in their Mixed Reality environment.`,
        });
        return response.text || "Stay focused and keep moving forward!";
    } catch (error) {
        return "Focus is key. Keep up the good work.";
    }
}