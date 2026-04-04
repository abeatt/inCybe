import 'dotenv/config';
import { VaultReader } from './reader/index.js';
import { processDocument } from '../core/processor.js';
import { deleteDocument } from '../core/db.js';

const VAULT_PATH = process.env.VAULT_PATH;

if (!VAULT_PATH) {
  console.error('❌ VAULT_PATH not set.');
  process.exit(1);
}

console.log('👀 Starting Real-time Vault Watcher...');

const reader = new VaultReader(VAULT_PATH);

reader.watch(async (event, doc) => {
  if (event === 'unlink') {
    console.log(`🗑️  Deleted: ${doc.path}`);
    await deleteDocument(doc.path);
  } else {
    const label = event === 'add' ? '✨ Added' : '📝 Modified';
    process.stdout.write(`${label}: ${doc.title.substring(0, 20)}... `);
    
    try {
      const start = Date.now();
      const stats = await processDocument(doc);
      const duration = (Date.now() - start) / 1000;
      console.log(`✅ Embedded (${stats.embedded} chunks) in ${duration}s`);
    } catch (err) {
      console.error(`\n❌ Failed to process ${doc.title}:`, err);
    }
  }
});