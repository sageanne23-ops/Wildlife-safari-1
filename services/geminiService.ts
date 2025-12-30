
import { GoogleGenAI } from "@google/genai";
import { PlannerState } from "../types";

// Initialize the Gemini client directly with the pre-configured API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a travel itinerary for Rwanda using Gemini AI based on user preferences.
 */
export const generateItinerary = async (plannerState: PlannerState): Promise<string> => {
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
    // Using gemini-3-flash-preview for general text generation tasks as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    // Extract generated text directly from the text property
    return response.text || "I couldn't generate an itinerary at this time. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate itinerary. Please try again later.");
  }
};
