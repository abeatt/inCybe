const OllamaProvider = require('./adapters/ollama');
const OpenAIProvider = require('./adapters/openai');
const DeepSeekProvider = require('./adapters/deepseek');
const ClaudeProvider = require('./adapters/claude');

class LLMManager {
  constructor() {
    const providerType = process.env.LLM_PROVIDER || 'ollama';
    this.primaryProvider = this._resolveProvider(providerType);
    this.backupProvider = new OllamaProvider(); // Local is always the safety net
    console.log(`[LLM MANAGER] Active Provider: ${providerType.toUpperCase()}`);
  }

  _resolveProvider(type) {
    switch (type?.toLowerCase()) {
      case 'openai':
        return new OpenAIProvider();
      case 'deepseek':
        return new DeepSeekProvider();
      case 'claude':
        return new ClaudeProvider();
      case 'ollama':
        return new OllamaProvider();
      default:
        throw new Error(`CRITICAL: Unrecognized LLM_PROVIDER "${type}". Valid options are: ollama, openai, deepseek, claude.`);
    }
  }

  /**
   * Execute completion with automatic fallback
   */
  async complete(prompt, options = {}) {
    try {
      return await this.primaryProvider.complete(prompt, options);
    } catch (error) {
      if (this.primaryProvider instanceof OllamaProvider) {
        throw new Error(`Local Ollama primary failed and no further fallback is available: ${error.message}`);
      }
      
      // Log error safely without including potentially sensitive request details
      console.warn(`[LLM FALLBACK] Primary provider failed (${error.message.split(':')[0]}). Routing to local Ollama...`);
      return await this.backupProvider.complete(prompt, options);
    }
  }
}

module.exports = new LLMManager();