export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Bạn là kỹ sư cơ khí, trả lời rõ ràng, có số liệu"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.choices?.[0]?.message?.content || "Không có phản hồi"
  });
}
