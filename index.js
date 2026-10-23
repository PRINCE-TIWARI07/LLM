
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
dotenv.config();

const app = express();
const port = 5001;

app.use(express.json());
//exporting GOOGLE_API_KEY--------------------------->>>
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


// LLM with longChain -------------------------------->>>
//Now using Groq api ----------->
const llm =new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature:0.7,
  maxTokens:100,
  maxRetries:2 
})

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const  response = await llm.invoke([
    {role: "system", 
      content:"you are a assistant and your name is JARVIS.if you don't know the answer then don't give incorrect answer"},
    {
      role:"human",
      content:input
    }
  ])

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
