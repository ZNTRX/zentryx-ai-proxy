export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);
    const prompt = body.prompt;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.toString() });
  }
}
