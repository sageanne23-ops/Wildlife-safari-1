import { GoogleGenAI } from "@google/genai";
import { PlannerState } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

export const generateItinerary = async (plannerState: PlannerState): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const prompt = `
    You are an expert travel agent specializing in Rwanda tourism (The Land of a Thousand Hills).
    Create a detailed, day-by-day travel itinerary for a client with the following preferences:
    
    - Duration: ${plannerState.days} days
    - Budget Level: ${plannerState.budget}
    - Group Size: ${plannerState.travelers} people
    - Key Interests: ${plannerState.interests.join(', ')}

    Please structure the response in Markdown. 
    Include:
    1. A catchy title for the trip.
    2. A brief overview of the experience.
    3. Day-by-day breakdown (morning, afternoon, evening).
    4. Recommended lodges or hotels that fit the budget (be specific with real names if known).
    5. Estimated cost breakdown range (optional but helpful).
    6. Packing tips for Rwanda (weather, terrain).

    Keep the tone welcoming, professional, and exciting. Focus on sustainability and eco-tourism where possible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "I couldn't generate an itinerary at this time. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate itinerary. Please try again later.");
  }
};
