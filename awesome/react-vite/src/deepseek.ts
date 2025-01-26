//! pnpm i openai -D

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-e57086471a8c452991b10378eba1135d",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "原神好玩吗" }],
    model: "deepseek-chat",
  });
  console.log(completion.choices[0].message.content);
}

main();
