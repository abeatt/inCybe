const LLMProvider = require('../provider');

class DeepSeekProvider extends LLMProvider {
  async complete(prompt, options = {}) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) throw new Error('DEEPSEEK_API_KEY is missing');

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024
      })
    });

    if (!response.ok) throw new Error(`DeepSeek error: ${response.statusText}`);
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
module.exports = DeepSeekProvider;