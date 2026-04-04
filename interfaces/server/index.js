import express from 'express';
import cors from 'cors';
import ragEngine from '../../core/rag/engine.js';
import { runIndexer } from '../../core/indexer.js';
import { getStats } from '../../core/db.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// POST /api/query - accepts question, returns grounded answer + citations
app.post('/api/query', async (req, res) => {
  try {
    const { question, history, options, stream } = req.body;
    if (!question) return res.status(400).json({ error: 'Missing question field' });

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const response = await ragEngine.query(
        question, 
        history || [], 
        options || {}, 
        (token) => {
          res.write(`data: ${JSON.stringify({ token })}\n\n`);
        }
      );

      // Send final metadata (sources, usage)
      res.write(`data: ${JSON.stringify({ 
        done: true, 
        sources: response.sources, 
        usage: response.usage 
      })}\n\n`);
      return res.end();
    }

    const response = await ragEngine.query(question, history || [], options || {});
    res.json(response);
  } catch (error) {
    console.error('Query Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats - returns index health, doc count, last sync timestamp
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({
      ...stats,
      healthy: true
    });
  } catch (error) {
    res.status(500).json({ healthy: false, error: error.message });
  }
});

// POST /reindex - triggers manual full re-index
app.post('/reindex', async (req, res) => {
  try {
    // Run in background but acknowledge receipt
    runIndexer().catch(err => console.error('Background Indexing Error:', err));
    res.json({ message: 'Indexing started' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /search?q= - raw semantic search, no LLM, returns top-K chunks
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const k = parseInt(req.query.k) || 5;
    if (!query) return res.status(400).json({ error: 'Missing query parameter q' });

    const results = await ragEngine.search(query, k);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 inCybe Server running on port ${PORT} (Available on network)`);
});