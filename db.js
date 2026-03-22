import lancedb from '@lancedb/lancedb';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Use a hidden local folder for the database
const DB_PATH = process.env.LANCEDB_PATH || '.incybe/data/vectors';

let dbInstance = null;

/**
 * Connects to the local LanceDB instance.
 */
export async function getDb() {
  if (dbInstance) return dbInstance;

  // Ensure directory exists
  await fs.mkdir(DB_PATH, { recursive: true });
  
  dbInstance = await lancedb.connect(DB_PATH);
  return dbInstance;
}

/**
 * Gets or creates the documents table.
 */
export async function getDocumentsTable() {
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
 * Initialize the DB table (call this once on startup/indexer)
 */
export async function initTable(initialData = []) {
  const db = await getDb();
  // Schema is inferred from data in LanceDB
  // We expect: { id, path, title, content, vector: [numbers], ... }
  return await db.createTable('documents', initialData, { mode: 'overwrite' });
}