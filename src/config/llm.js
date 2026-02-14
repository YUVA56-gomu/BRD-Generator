const axios = require('axios');
require('dotenv').config();

const LLM_PROVIDER = process.env.LLM_PROVIDER || 'openai';

const callLLM = async (prompt, systemPrompt = '') => {
  try {
    if (LLM_PROVIDER === 'openai') {
      return await callOpenAI(prompt, systemPrompt);
    } else if (LLM_PROVIDER === 'gemini') {
      return await callGemini(prompt, systemPrompt);
    }
    throw new Error(`Unsupported LLM provider: ${LLM_PROVIDER}`);
  } catch (error) {
    throw new Error(`LLM call failed: ${error.message}`);
  }
};

const callOpenAI = async (prompt, systemPrompt) => {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.choices[0].message.content;
};

const callGemini = async (prompt, systemPrompt) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{
        parts: [
          ...(systemPrompt ? [{ text: systemPrompt }] : []),
          { text: prompt },
        ],
      }],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

module.exports = { callLLM };
