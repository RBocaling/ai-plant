import OpenAI from "openai";
import config from "../config/server.js";

const openai = new OpenAI({
  apiKey: config.openAiApiKey,
});

export const getPlantResponse = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant that only answers questions strictly related to **plants, gardening, and plant care**. You are not allowed to answer anything outside this topic.

If the user's question is related to plants (such as diseases, watering, sunlight, propagation, pests, fertilizers, types of plants, or plant health), respond clearly and helpfully using expert-level plant knowledge, as if it's 2025.

If the question is **not related to plants**, politely respond with:
**"Please make sure your question is about plants, gardening, or plant care. I'm here to help only with plant-related topics."**

Be professional and use clear, simple language suitable for plant lovers and hobbyists.

User message: "${message}"`,
        },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating plant response:", error);
    return "Sorry, something went wrong while processing your question.";
  }
};
