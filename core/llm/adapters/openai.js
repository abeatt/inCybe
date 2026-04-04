const LLMProvider = require('../provider');

class OpenAIProvider extends LLMProvider {
  async complete(prompt, options = {}) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is missing');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`OpenAI error: ${err.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const usage = {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens
    };

    this.logUsage(usage);
    return { text: data.choices[0].message.content, usage };
  }
}
module.exports = OpenAIProvider;