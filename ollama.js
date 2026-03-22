import dotenv from 'dotenv';

dotenv.config();

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

/**
 * Generates an embedding vector for the given text.
 * Uses 'nomic-embed-text' by default.
 */
export async function generateEmbedding(text) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: text
      })
    });

    const data = await response.json();

    if (data.error || !data.embedding) {
      console.error(`\n❌ Ollama API Error: ${data.error || 'No embedding returned'}`);
      return null;
    }

    return data.embedding; // Array of numbers (e.g. 768 length)
  } catch (err) {
    console.error('❌ Ollama embedding failed:', err);
    return null;
  }
}