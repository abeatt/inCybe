module.exports = {
  apps: [
    {
      name: 'incybe-server',
      script: './interfaces/server/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs', '.git', '*.md'],
      env: {
        NODE_ENV: 'development',
      }
    }
  ]
};