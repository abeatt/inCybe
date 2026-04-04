const dotenv = require('dotenv');
const { VaultReader } = require('../obsidian/reader/index');
const { VaultReader } = require('../obsidian/reader/index');

dotenv.config();

const vaultPath = process.env.VAULT_PATH;

async function runWatcherTest() {
  console.log('🧪 Starting Vault Watcher Test...');
  const reader = new VaultReader(vaultPath);

  // 1. Initial Scan
  await reader.indexFullVault();
  console.log('✅ Initial scan complete. Starting watcher...');
  console.log('👉 Try editing a file in your vault now.\n');

  // 2. Start Watcher
  reader.watch((event, file) => {
    console.log(`\n🔔 Event Detected: [${event.toUpperCase()}]`);
    console.log(`   File: ${file.path}`);
    if (event !== 'unlink') {
      console.log(`   Updated Title: ${file.title}`);
      console.log(`   Updated Modified Time: ${file.modified}`);
    }
  });
}

runWatcherTest();