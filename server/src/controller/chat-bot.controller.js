import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { initialHistory } from "../lib/initialHistory.js";
import { config } from "dotenv";
config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];
const generationConfig = { temperature: 0.5 };

export const getResponses = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Combine initialHistory with the request history
    const history = [...initialHistory, ...req.body.history];

    // Start the chat session
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: history,
    });

    const result = await chat.sendMessage(prompt);
    const chat_response = result.response.text();
    res.send(chat_response);
  } catch (error) {
    console.error("Error generating response:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
