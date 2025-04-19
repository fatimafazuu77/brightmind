import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";
import mime from "react-native-mime-types";

// Load API Key (can be from .env or app config)
const apiKey = process.env.EXPO_PUBLIC_GETMNI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Create chat session
export const GenerateTopicAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Learn Python ::  As your are coaching teacher
          - User want to learn about the topic
          - Generate 5-7 Course title for study (Short)
          - Make sure it is releated to description
          - Output will be ARRAY of String in JSON FORMAT only
          - Do not add any plain text in output`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `[
  "Python Basics: A Gentle Introduction",
  "Data Structures & Algorithms in Python",
  "Object-Oriented Programming with Python",
  "Web Development with Python (Flask/Django)",
  "Data Science & Machine Learning using Python",
  "Automating Tasks with Python Scripting",
  "Python for Data Analysis and Visualization"
]`,
        },
      ],
    },
  ],
});

// Send message and save response
export const sendMessageAndSave = async (inputText) => {
  try {
    const chatSession = await GenerateTopicAIModel;
    const result = await chatSession.sendMessage(inputText);

    const responseText = result.response.text();

    // Save file
    const fileName = `course_titles_${Date.now()}.json`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.writeAsStringAsync(fileUri, responseText, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log(`File saved to: ${fileUri}`);
    return fileUri;

  } catch (error) {
    console.error("Error:", error);
  }
};
