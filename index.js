import fetch from "node-fetch";
import express from "express";

const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch(
      "https://zentryxos-roblox-ai-server.hf.space/run/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({ data: [prompt] })
      }
    );

    const data = await response.json();

    if (data && data.data && data.data[0]) {
      res.json({ reply: data.data[0] });
    } else {
      res.json({ reply: "Eroare la AI (format)." });
    }
  } catch (err) {
    res.json({ reply: "Eroare la AI (server)." });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running");
});
