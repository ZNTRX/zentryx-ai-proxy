import fetch from "node-fetch";
import express from "express";

const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://zentryxos-roblox-ai-server.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [prompt] })
    });

    const data = await response.json();
    res.json({ reply: data.data[0] });
  } catch (err) {
    res.json({ reply: "Eroare la server." });
  }
});

app.listen(3000);
