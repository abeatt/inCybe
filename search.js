import { getDb, generateEmbedding } from './index.js';

const query = process.argv[2];

if (!query) {
  console.error('❌ Please provide a search query.');
  console.log('   Usage: node search.js "your search term"');
  process.exit(1);
}

async function searchVault() {
  console.log(`🔍 Searching for: "${query}"...`);
  
  const db = await getDb();
  const tbl = await db.openTable('documents');
  
  const vector = await generateEmbedding(query);
  
  if (!vector) {
    console.error('❌ Failed to generate embedding for query.');
    return;
  }

  const results = await tbl.vectorSearch(vector).limit(3).toArray();

  console.log(`\n✅ Found ${results.length} relevant matches:\n`);
  results.forEach((r, i) => {
    console.log(`${i+1}. [${r.title}] (Score: ${(1 - r._distance).toFixed(4)})`);
    console.log(`   Path: ${r.path}`);
    console.log(`   "${r.content.substring(0, 150).replace(/\n/g, ' ')}..."\n`);
  });
}

searchVault();