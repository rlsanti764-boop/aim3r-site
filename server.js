import express from "express";
import cors from "cors";
import OpenAI from "openai";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// 🤖 CHAT IA
app.post("/chat", async (req, res) => {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: req.body.message,
  });

  res.json({ reply: response.output_text });
});


// 🎞️ GIF API (tenor)
app.get("/gif", async (req, res) => {
  const q = req.query.q;

  const url = `https://tenor.googleapis.com/v2/search?q=${q}&key=LIVDSRZULELA&limit=1`;

  const response = await fetch(url);
  const data = await response.json();

  res.json({
    url: data.results[0].media_formats.gif.url
  });
});

app.listen(3000, () => console.log("Server ON"));
