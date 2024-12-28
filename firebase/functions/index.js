// functions/index.js
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { googleAI, gemini15Pro } = require("@genkit-ai/googleai");
const { genkit, z } = require("genkit");

// Initialize AI
const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyCOevbpnEJ3enKO9bTlDBZv7hW2Dn6mfYM" })], // Replace with your API key
  model: gemini15Pro,
});

// Firebase Function to handle chatbot replies
exports.chatbotReply = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const { userMessage } = request.body;

      if (!userMessage) {
        return response.status(400).json({ error: "User message is required." });
      }

      // AI prompt to generate dynamic response based on user input
      const prompt = `You are an AI interview preparation assistant. Respond to: "${userMessage}". Provide a helpful reply and a follow-up question.`;

      // Generate response using the AI model
      const { output } = await ai.generate({
        prompt: prompt,
        output: {
          format: "json",
          schema: z.object({
            reply: z.string(),
            nextPrompt: z.string(),
          }),
        },
      });

      return response.status(200).json({
        reply: output.reply,
        nextPrompt: output.nextPrompt,
      });
    } catch (error) {
      console.error("Error in chatbotReply:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  });
});
