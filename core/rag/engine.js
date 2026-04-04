import llm from '../llm/index.js';
import lancedb from '@lancedb/lancedb';
import { generateEmbedding } from '../llm/embeddings.js';
import path from 'path';

/**
 * RAG Engine - Connects semantic search with LLM generation
 */
class RAGEngine {
  constructor() {
    this.dbPath = path.resolve(process.env.LANCEDB_PATH || '.incybe/data/vectors');
    this.tableName = 'documents';
    this.table = null;
  }

  async _getTable() {
    if (this.table) return this.table;
    
    const db = await lancedb.connect(this.dbPath);
    const tables = await db.tableNames();
    if (!tables.includes(this.tableName)) throw new Error("Vector database not initialized. Run 'npm run index' first.");
    
    this.table = await db.openTable(this.tableName);
    return this.table;
  }

  /**
   * Execute raw semantic search without LLM generation
   * @param {string} query - The search query
   * @param {number} k - Number of results to return
   */
  async search(query, k = 5) {
    const embedding = await generateEmbedding(query);
    if (!embedding) throw new Error("Failed to generate embedding");

    const table = await this._getTable();
    return await table.search(embedding).limit(k).execute();
  }

  /**
   * Execute a grounded query against the vault
   * @param {string} question - The user's query
   * @param {Array} history - Array of { role: 'user'|'assistant', content: string }
   * @param {Object} options - Configuration for retrieval (k, temperature)
   * @param {Function} onToken - Optional callback for streaming tokens
   */
  async query(question, history = [], options = {}, onToken = null) {
    const k = options.k || 5;

    // 1. Top-K Retrieval: Generate embedding for the query and search LanceDB
    const embedding = await generateEmbedding(question);
    if (!embedding) {
      throw new Error("Failed to generate embedding for the search query.");
    }

    const table = await this._getTable();
    
    const results = await table
      .search(embedding)
      .limit(k)
      .execute();

    // 2. Graceful fallback for 'No relevant content found'
    if (!results || results.length === 0) {
      return {
        answer: "I couldn't find any information in your vault that is relevant to that question.",
        sources: []
      };
    }

    // 3. Context Assembly & Source Citation tracking
    const contextChunks = results.map(r => `[Source: ${r.path}]\n${r.content}`).join('\n\n---\n\n');

    // 4. System Prompt: Enforcing vault-grounded answering only
    const systemPrompt = `You are inCybe, an AI personal assistant. 
Your primary knowledge source is the user's Obsidian vault.
Answer the question based ONLY on the provided vault context. 
If the answer is not in the context, say you don't know based on the vault content.
Always cite the file name in brackets, e.g. [My Note.md].

Vault Context:
${contextChunks}`;

    // 5. Conversation History Support (Multi-turn Q&A)
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: question }
    ];

    // Optimized for Llama 3 Chat format to ensure cleaner demo responses
    const fullPrompt = messages.map(m => {
      if (m.role === 'system') return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${m.content}<|eot_id|>`;
      return `<|start_header_id|>${m.role}<|end_header_id|>\n\n${m.content}<|eot_id|>`;
    }).join('') + `<|start_header_id|>assistant<|end_header_id|>\n\n`;

    const response = await llm.complete(fullPrompt, {
      temperature: options.temperature || 0.2,
      onToken: onToken
    });

    // 6. Source citation in responses (filename + excerpt)
    return {
      answer: response.text,
      sources: results.map(r => ({ 
        path: r.path, 
        excerpt: r.content.substring(0, 150) + '...',
        score: r._distance // LanceDB returns _distance by default
      })),
      usage: response.usage
    };
  }
}

const engine = new RAGEngine();
export default engine;