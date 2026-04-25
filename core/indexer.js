import 'dotenv/config';
import crypto from 'crypto';
import { VaultReader } from '../obsidian/reader/index.js';
import { getAssetRegistry } from './db.js';
import { processDocument } from './processor.js';
import { notify } from './notifier.js';
import path from 'path';
import { deleteDocument } from './db.js';
import { fileURLToPath } from 'url';

const VAULT_PATH = process.env.VAULT_PATH;

if (!VAULT_PATH) {
  console.error('❌ VAULT_PATH not set in .env');
  process.exit(1);
}

async function runIndexer() {
  console.log('🚀 Starting Full Vault Index...');
  const start = Date.now();

  // Support environment variable fallback as npm often intercepts CLI flags
  // Standardize flag detection to bypass npm interception issues
  const forceFlags = ['--fresh', '--rebuild', '--rebuild-bundle', '-f'];
  const force = process.env.REINDEX === 'true' || forceFlags.some(flag => process.argv.includes(flag));


  if (force) console.log('⚡ Force Mode: Active (Ignoring existing hashes)');

  // 1. Scan Vault
  const reader = new VaultReader(VAULT_PATH);
  const docs = await reader.indexFullVault();
  
  if (docs.length === 0) {
    console.log('⚠️ No Markdown files found.');
    return;
  }

  // 2. Check for changes (Incremental Sync)
  console.log('🔍 Checking against existing index...');
  const registry = await getAssetRegistry();
  const toProcess = [];

  for (const doc of docs) {
    const currentHash = crypto.createHash('md5').update(doc.content).digest('hex');
    doc.checksum = currentHash; // Attach for storage

    // Compare with registry (Normalize path for Windows case-insensitivity)
    const existingHash = registry.get(doc.path.toLowerCase());
    if (force || existingHash !== currentHash) {
      toProcess.push(doc);
    }
  }

  if (toProcess.length === 0) {
    console.log('✅ Vault is up to date. No changes detected. Use --fresh to re-index everything.');
    return;
  }

  // 3. Cleanup: Remove stale records (files that exist in DB but no longer on disk)
  const diskPaths = new Set(docs.map(d => path.normalize(d.path).toLowerCase()));
  const stalePaths = [...registry.keys()].filter(p => !diskPaths.has(path.normalize(p).toLowerCase()));

  if (stalePaths.length > 0) {
    console.log(`\n🧹 Cleaning up ${stalePaths.length} stale records...`);
    for (const stale of stalePaths) {
      await deleteDocument(stale);
      console.log(`   Removed: ${path.basename(stale)}`);
    }
  }

  console.log(`\n📄 Processing ${toProcess.length} new/modified files...`);
  const records = [];

  for (const doc of toProcess) {
    // Print progress without newline to keep console clean
    process.stdout.write(`   Processing: ${doc.title.substring(0, 25).padEnd(25)} `);
    try {
      const stats = await processDocument(doc);
      process.stdout.write(`-> ${stats.embedded}/${stats.chunks} chunks embedded.\n`);
      records.push(stats);
    } catch (err) {
      process.stdout.write(`-> ❌ FAILED\n`);
      console.error(`      Error: ${err.message}`);
      notify(`❌ Error indexing ${doc.path}: ${err.message}`);
    }
  }

  // Final Summary
  if (records.length > 0) {
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n✅ Indexing complete in ${duration}s.`);
    notify(`✅ Indexing complete: ${toProcess.length} files processed in ${duration}s.`);
  } else {
    console.error('❌ No embeddings generated.');
  }
}

// Handle direct execution in ESM
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  runIndexer();
}

export { runIndexer };