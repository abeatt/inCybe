import lancedb from '@lancedb/lancedb';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// Use a hidden local folder for the database
const DB_PATH = path.resolve(process.env.LANCEDB_PATH || '.incybe/data/vectors');

let dbInstance = null;

/**
 * Connects to the local LanceDB instance.
 */
async function getDb() {
  if (dbInstance) return dbInstance;

  // Ensure directory exists
  await fs.mkdir(DB_PATH, { recursive: true });
  
  dbInstance = await lancedb.connect(DB_PATH);
  return dbInstance;
}

/**
 * Gets or creates the documents table.
 */
async function getDocumentsTable() {
  const db = await getDb();
  const tableName = 'documents';
  
  // Check if table exists
  const existingTables = await db.tableNames();
  if (existingTables.includes(tableName)) {
    return await db.openTable(tableName);
  }

  // Create new table with schema implied by first insertion or empty
  // For LanceDB, we usually create with data, but we can init empty
  // We'll return null here and handle creation on first insert in the indexer
  return null;
}

/**
 * Adds documents to the table (appends if exists).
 */
async function addDocuments(data) {
  const db = await getDb();
  const tableName = 'documents';
  const existing = await db.tableNames();

  if (existing.includes(tableName)) {
    const table = await db.openTable(tableName);
    await table.add(data);
  } else {
    await db.createTable(tableName, data);
  }
}

/**
 * Deletes all chunks associated with a specific file path.
 */
async function deleteDocument(filePath) {
  const db = await getDb();
  if (!(await db.tableNames()).includes('documents')) return;
  
  const table = await db.openTable('documents');
  // Escape single quotes for SQL-like filter
  const safePath = filePath.replace(/'/g, "''");
  await table.delete(`path = '${safePath}'`);
}

/**
 * Returns a Map of path -> checksum for all indexed files.
 */
async function getAssetRegistry() {
  const db = await getDb();
  if (!(await db.tableNames()).includes('documents')) return new Map();

  const table = await db.openTable('documents');
  try {
    // Fetch only path and checksum columns
    const results = await table.query().select(['path', 'checksum']).limit(100000).toArray();
    
    const registry = new Map();
    results.forEach(r => registry.set(r.path, r.checksum));
    return registry;
  } catch (err) {
    console.warn('⚠️  Old DB schema detected (missing checksum). Resetting index...');
    await db.dropTable('documents');
    return new Map();
  }
}

/**
 * Returns status statistics for the database.
 */
async function getStats() {
  const db = await getDb();
  if (!(await db.tableNames()).includes('documents')) {
    return { docCount: 0, lastSync: null };
  }

  const table = await db.openTable('documents');
  const all = await table.query().select(['path', 'updated_at']).toArray();
  
  const uniquePaths = new Set(all.map(r => r.path));
  const lastSync = all.length > 0 ? new Date(Math.max(...all.map(r => new Date(r.updated_at).getTime()))).toISOString() : null;

  return { docCount: uniquePaths.size, lastSync };
}

export {
  getDb,
  getDocumentsTable,
  addDocuments,
  deleteDocument,
  getAssetRegistry,
  getStats
};