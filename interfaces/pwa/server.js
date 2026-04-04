import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ragEngine from '../../core/rag/engine.js';
import * as db from '../../core/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Industrial Logger for Demo Visibility
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\x1b[33m[${timestamp}] [INCYBE-API]\x1b[0m ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ status: "inCybe Core Online", documentation: "Phase 1 Knowledge Layer" });
});

/**
 * Returns Vault Statistics (Document Count, Last Sync)
 */
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await db.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Handles Grounded RAG Queries
 */
app.post('/api/query', async (req, res) => {
  const { question, history = [] } = req.body;
  
  if (!question) return res.status(400).json({ error: "Question is required" });

  try {
    // RAGEngine handles LanceDB retrieval and Ollama generation
    const result = await ragEngine.query(question, history, {
      k: 5,
      temperature: 0.2 // Low temp for factual consistency
    });
    
    res.json(result);
  } catch (err) {
    console.error("RAG Query Error:", err);
    res.status(500).json({ error: "Failed to process query through local LLM." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 inCybe Command Server running at http://localhost:${PORT}`);
});