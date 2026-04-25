const path = require('path');
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'incybe-server',
      script: path.join(__dirname, 'interfaces/server/index.js'),
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git', '.incybe/data', 'obsidian/**'],
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        LANCEDB_PATH: path.join(__dirname, '.incybe/data/vectors')
      }
    },
    {
      name: 'incybe-watcher',
      script: path.join(__dirname, 'obsidian/watcher.js'),
      watch: false, // Don't watch the watcher itself
      env: {
        NODE_ENV: 'development',
        VAULT_PATH: process.env.VAULT_PATH,
        LANCEDB_PATH: path.join(__dirname, '.incybe/data/vectors')
      }
    },
    {
      name: 'incybe-pwa',
      script: 'node_modules/vite/bin/vite.js',
      args: 'interfaces/pwa --host',
      cwd: __dirname,
      watch: false,
    }
  ]
};