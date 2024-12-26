/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const cors = require("cors")({ origin: true });
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { genkit, z } = require("genkit");
const { googleAI, gemini15Pro } = require("@genkit-ai/googleai");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyCOevbpnEJ3enKO9bTlDBZv7hW2Dn6mfYM" })],
  model: gemini15Pro,
});

// // exports.question = onRequest(async (request, response) => {
// // //   logger.info("Hello logs!", {structuredData: true});
// // //   response.send("Hello from Firebase!");
// // const {text} = await ai.generate({
// // prompt:"generate one question"

// // })
// response.send(text)
// });
exports.question = onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      const { output } = await ai.generate({
        prompt: "Give 2 tips for interview preparation as a btech student",
        output: {
          format: "json",
          schema: z.object({
            question: z.string(),
            answer: z.string(),
            explanation: z.string(),
          }),
        },
      });

      console.log("AI Output:", output);
      return response.status(200).json(output);
    } catch (error) {
      console.error("Error in AI Generation:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  });
});


// const ai = genkit({
//   plugins: [googleAI({ apiKey: "" })],
//   model: gemini15Pro,
// });