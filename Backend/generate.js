const axios = require("axios");

const generateQuestion = async (topic, difficulty) => {
  const model = "gpt2"; // Hugging Face Model like GPT-2 or other models
  const prompt = `Generate an interview question about ${topic} with ${difficulty} difficulty.`;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/" + model,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
        },
      }
    );

    // Extract and return the generated question
    return response.data[0].generated_text;
  } catch (error) {
    console.error("Error generating question:", error);
    return "Failed to generate question.";
  }
};

module.exports = generateQuestion;
