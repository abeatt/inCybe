import { VaultReader } from './obsidian/reader/index.js';
import { processDocument } from './core/processor.js';
import path from 'path';
import 'dotenv/config';

async function run() {
  const vaultPath = path.resolve(process.env.VAULT_PATH || './my-vault');
  const reader = new VaultReader(vaultPath);
  
  console.log("⚡ Starting Full Vault Index...");
  const docs = await reader.indexFullVault();

  for (const doc of docs) {
    console.log(`- Processing: ${doc.title}`);
    const stats = await processDocument(doc);
    console.log(`  └─ Chunks: ${stats.chunks}, Embedded: ${stats.embedded}`);
  }

  console.log(`✅ Vault indexing complete.`);
}

run().catch(console.error);