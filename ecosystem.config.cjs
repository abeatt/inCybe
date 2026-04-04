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
      script: 'npm.cmd',
      args: 'run dev -- --host',
      cwd: path.join(__dirname, 'interfaces/pwa'),
      shell: true, // Required for npm on Windows
      watch: false,
    }
  ]
};