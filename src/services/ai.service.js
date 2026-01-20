const { GoogleGenAI } = require("@google/genai");
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateContent(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction: `you are an expert in genrating caption for images.
      you genrate single caption for the image.
      your caption should be short and concise.
      you use hashtage and emojis in the caption.
      genrate tapori language.
      create aasthetic caption for the image.
      this caption should be in dark humor.`,
    },
  });
  return response.text;
}
module.exports = { generateContent };
// generateContent
