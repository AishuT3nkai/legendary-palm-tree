const json = (body, status = 200) => ({
  status,
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body)
});

async function callOpenAI(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are ChatGPT, the primary analyst in the Leaf AI Council. Give a concrete, technically useful first answer. Do not claim to have consulted Claude or DeepSeek yet."
        },
        { role: "user", content: userMessage }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response from ChatGPT.";
}

async function callClaude(userMessage, chatgptAnswer) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 1800,
      system:
        "You are Claude, the second engineer in the Leaf AI Council. Critique ChatGPT's proposal, identify omissions or better alternatives, and then give your own recommendation. Be direct and constructive.",
      messages: [
        {
          role: "user",
          content:
            `User request:\n${userMessage}\n\nChatGPT's proposal:\n${chatgptAnswer}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.map((item) => item.text || "").join("\n") || "No response from Claude.";
}

async function callDeepSeek(userMessage, chatgptAnswer, claudeAnswer) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are DeepSeek, the independent auditor in the Leaf AI Council. Review the discussion critically. Point out incorrect assumptions, risks, missing details, and practical improvements. Do not simply agree."
        },
        {
          role: "user",
          content:
            `User request:\n${userMessage}\n\nChatGPT:\n${chatgptAnswer}\n\nClaude:\n${claudeAnswer}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`DeepSeek request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response from DeepSeek.";
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    const { message } = request.body || {};

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return json({ error: "Message is required." }, 400);
    }

    if (message.length > 12000) {
      return json({ error: "Message is too long." }, 413);
    }

    const required = [
      "OPENAI_API_KEY",
      "OPENAI_MODEL",
      "ANTHROPIC_API_KEY",
      "ANTHROPIC_MODEL",
      "DEEPSEEK_API_KEY",
      "DEEPSEEK_MODEL"
    ];

    const missing = required.filter((key) => !process.env[key]);
    if (missing.length) {
      return json({
        error: "Council is not configured yet.",
        missing
      }, 503);
    }

    const chatgpt = await callOpenAI(message.trim());
    const claude = await callClaude(message.trim(), chatgpt);
    const deepseek = await callDeepSeek(message.trim(), chatgpt, claude);

    return json({
      message: message.trim(),
      council: {
        chatgpt,
        claude,
        deepseek
      }
    });
  } catch (error) {
    return json({
      error: "The council request failed.",
      detail: error.message
    }, 500);
  }
}
