
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
dotenv.config();

const app = express();
const port = 5001;

app.use(express.json());
//exporting GOOGLE_API_KEY--------------------------->>>
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


// LLM with longChain -------------------------------->>>

const llm =new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash"
})

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const  response = await llm.invoke(input)

  res.status(200).json({ "ai:":response.content });
});




//Get enpoint ----------------->>>
app.get("/", (req, res) => {
  return res.json({
    message: "Hello from level 4",
  });
});

app.listen(port, () => {
  console.log("Server Started");
});
