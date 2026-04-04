const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';

/**
 * Generates an embedding vector for the given text using Ollama.
 */
async function generateEmbedding(text) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: EMBED_MODEL,
        prompt: text
      })
    });

    const data = await response.json();

    if (data.error || !data.embedding) {
      throw new Error(data.error || 'No embedding returned from Ollama');
    }

    return data.embedding;
  } catch (err) {
    console.error(`❌ Embedding failed: ${err.message}`);
    return null;
  }
}

module.exports = { generateEmbedding };