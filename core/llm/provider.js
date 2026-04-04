/**
 * Base LLM Provider Interface
 */
class LLMProvider {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Standard completion method
   * @param {string} prompt 
   * @param {object} options { temperature, maxTokens }
   * @returns {Promise<object>} { text, usage: { promptTokens, completionTokens, totalTokens } }
   */
  async complete(prompt, options = {}) {
    throw new Error('Method "complete()" must be implemented by the provider.');
  }

  logUsage(usage) {
    console.log(`[LLM USAGE] ${new Date().toISOString()} - Prompt: ${usage.promptTokens}, Completion: ${usage.completionTokens}, Total: ${usage.totalTokens}`);
  }
}

module.exports = LLMProvider;