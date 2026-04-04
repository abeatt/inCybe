const dotenv = require('dotenv');
const { VaultReader } = require('../interfaces/server/index');

// Load environment variables (for VAULT_PATH)
dotenv.config();

const vaultPath = process.env.VAULT_PATH;

if (!vaultPath) {
  console.error('❌ Error: VAULT_PATH is not defined in .env');
  console.error('Please set VAULT_PATH=C:\\Path\\To\\Your\\Vault in your .env file.');
  process.exit(1);
}

async function runTest() {
  console.log('🧪 Starting Vault Reader Test...');
  const reader = new VaultReader(vaultPath);

  const start = Date.now();
  const docs = await reader.indexFullVault();
  const duration = (Date.now() - start) / 1000;

  console.log(`\n✅ Indexing complete in ${duration}s`);
  console.log(`📊 Processed ${docs.length} documents.`);
  
  if (docs.length > 0) {
    console.log('\n📄 Sample Document (First Result):');
    console.log(JSON.stringify(docs[0], null, 2));
  }
}

runTest();