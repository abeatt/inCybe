import { VaultReader } from '../obsidian/reader/index.js';
import path from 'path';
import 'dotenv/config';

async function testReader() {
  console.log('🔍 Testing Vault Reader...');
  const vaultPath = process.env.VAULT_PATH;

  if (!vaultPath) {
    console.error('❌ VAULT_PATH not set in .env');
    process.exit(1);
  }

  const reader = new VaultReader(vaultPath);
  const docs = await reader.indexFullVault();
  
  console.log(`✅ Scanned ${docs.length} documents.`);
  if (docs.length > 0) {
    console.log('📄 Sample Frontmatter:', JSON.stringify(docs[0].frontmatter, null, 2));
  }
}

testReader().catch(console.error);