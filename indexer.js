import dotenv from 'dotenv';
import { VaultReader, initTable, chunkText, generateEmbedding } from './index.js';

dotenv.config();

const VAULT_PATH = process.env.VAULT_PATH;

if (!VAULT_PATH) {
  console.error('❌ VAULT_PATH not set in .env');
  process.exit(1);
}

async function runIndexer() {
  console.log('🚀 Starting Full Vault Index...');
  const start = Date.now();

  // 1. Scan Vault
  const reader = new VaultReader(VAULT_PATH);
  const docs = await reader.indexFullVault();
  
  if (docs.length === 0) {
    console.log('⚠️ No Markdown files found.');
    return;
  }

  console.log(`\n📄 Parsing and Embedding ${docs.length} files...`);
  const records = [];

  for (const doc of docs) {
    // Print progress without newline to keep console clean
    process.stdout.write(`   Processing: ${doc.title.substring(0, 25).padEnd(25)} `);
    
    // Chunk text
    const chunks = chunkText(doc.content, 1000, 100); // ~200 tokens per chunk
    let successChunks = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const vector = await generateEmbedding(chunk);
      
      if (vector) {
        records.push({
          id: `${doc.path}#${i}`,
          path: doc.path,
          title: doc.title,
          content: chunk,
          metadata: JSON.stringify(doc.frontmatter || {}),
          vector: vector,
          updated_at: new Date().toISOString()
        });
        successChunks++;
      }
    }
    process.stdout.write(`-> ${successChunks}/${chunks.length} chunks embedded.\n`);
  }

  // 2. Write to LanceDB
  if (records.length > 0) {
    console.log(`\n💾 Writing ${records.length} records to LanceDB...`);
    await initTable(records);
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`✅ Indexing complete in ${duration}s.`);
  } else {
    console.error('❌ No embeddings generated.');
  }
}

runIndexer();