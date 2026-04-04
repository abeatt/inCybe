import crypto from 'crypto';
import { chunkText } from './chunker.js';
import { generateEmbedding } from './llm/embeddings.js';
import { addDocuments, deleteDocument } from './db.js';

/**
 * Processes a single document: Deletes old chunks -> Chunks -> Embeds -> Saves.
 * @param {Object} doc - The document object from VaultReader
 * @returns {Promise<Object>} Stats { chunks, embedded }
 */
async function processDocument(doc) {
  // Safety check: skip empty or invalid content
  if (!doc.content || doc.content.trim().length === 0) {
    return { chunks: 0, embedded: 0 };
  }

  // 1. Calculate Hash (if not already present)
  const timestamp = new Date().toISOString();
  
  if (!doc.checksum) {
    doc.checksum = crypto.createHash('md5').update(doc.content).digest('hex');
  }

  // 2. Delete existing chunks for this file (clean slate)
  await deleteDocument(doc.path);

  // 3. Chunk & Embed
  const chunks = chunkText(doc.content, 2000, 200); // ~500 tokens per chunk, 50 token overlap
  const records = [];
  let successCount = 0;

  for (let i = 0; i < chunks.length; i++) {
    const vector = await generateEmbedding(chunks[i]);
    if (vector) {
      records.push({
        id: `${doc.path}#${i}`,
        path: doc.path,
        title: doc.title,
        content: chunks[i],
        metadata: JSON.stringify({
          ...(doc.frontmatter || {}),
          tags: doc.tags || [],
          links: doc.links || []
        }),
        vector: vector,
        checksum: doc.checksum,
        updated_at: timestamp
      });
      successCount++;
    } else {
      console.warn(`\n⚠️  Failed to generate embedding for chunk ${i} of ${doc.path}`);
    }
  }

  // 4. Save to DB
  if (records.length > 0) {
    await addDocuments(records);
  }

  return { chunks: chunks.length, embedded: successCount };
}

export { processDocument };