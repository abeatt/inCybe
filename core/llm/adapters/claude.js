const LLMProvider = require('../provider');

class ClaudeProvider extends LLMProvider {
  async complete(prompt, options = {}) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const endpoint = process.env.LEGION_CLAUDE_ENDPOINT || 'https://api.anthropic.com/v1/messages';
    
    if (!apiKey) {
      throw new Error("❌ ANTHROPIC_API_KEY is missing in .env");
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || 'claude-3-opus-20240229',
          max_tokens: options.maxTokens || 1024,
          messages: [{ role: 'user', content: prompt }],
          temperature: options.temperature || 0.7
        })
      });

      if (!response.ok) throw new Error(`Claude error: ${response.statusText}`);
      const data = await response.json();

      const usage = {
        promptTokens: data.usage.input_tokens || 0,
        completionTokens: data.usage.output_tokens || 0,
        totalTokens: (data.usage.input_tokens || 0) + (data.usage.output_tokens || 0)
      };

      this.logUsage(usage);
      return { text: data.content[0].text, usage };
    } catch (err) {
      throw new Error(`Claude Provider Error: ${err.message}`);
    }
  }
}

module.exports = ClaudeProvider;