import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chokidar from 'chokidar';

export class VaultReader {
  constructor(vaultPath) {
    this.vaultPath = vaultPath;
    this.documents = new Map(); // Cache: filePath -> parsedDocument
    this.isReady = false;
  }

  /**
   * Scans the entire vault recursively for .md files.
   * @returns {Promise<Array>} Array of parsed document objects
   */
  async indexFullVault() {
    console.log(`🔍 Scanning vault at: ${this.vaultPath}`);
    
    try {
      // Find all markdown files, ignoring .incybe and .obsidian folders
      const files = await glob('**/*.md', { 
        cwd: this.vaultPath, 
        ignore: ['.incybe/**', '.obsidian/**', '.trash/**', '.git/**'],
        absolute: true 
      });

      console.log(`📄 Found ${files.length} Markdown files.`);
      
      // Process files in parallel
      const documents = await Promise.all(files.map(f => this.processFile(f)));
      
      // Cache results
      this.documents.clear();
      documents.forEach(doc => {
        if (doc) this.documents.set(doc.path, doc);
      });

      this.isReady = true;
      return documents.filter(Boolean);
    } catch (err) {
      console.error('❌ Vault scan failed:', err);
      throw err;
    }
  }

  /**
   * Reads and parses a single Markdown file.
   * @param {string} filePath - Absolute path to the file
   */
  async processFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const stats = await fs.stat(filePath);
      const parsed = matter(content); // Separates YAML frontmatter from body

      // Extract Wikilinks: [[Target]] or [[Target|Alias]]
      const linkRegex = /\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g;
      const links = [];
      let match;
      while ((match = linkRegex.exec(parsed.content)) !== null) {
        links.push(match[1]);
      }

      // Extract Inline Tags: #tag
      const tagRegex = /(?:^|\s)#([a-zA-Z0-9_\/-]+)/g;
      const inlineTags = [];
      while ((match = tagRegex.exec(parsed.content)) !== null) {
        inlineTags.push(match[1]);
      }

      // Combine Frontmatter tags and Inline tags
      const fmTags = parsed.data.tags || parsed.data.tag || [];
      const normalizedFmTags = Array.isArray(fmTags) ? fmTags : [fmTags];
      const allTags = [...new Set([...inlineTags, ...normalizedFmTags])].filter(Boolean);

      return {
        id: filePath,
        path: filePath,
        title: parsed.data.title || path.basename(filePath, '.md'),
        content: parsed.content.trim(),
        frontmatter: parsed.data,
        tags: allTags,
        links: links,
        modified: stats.mtime
      };
    } catch (err) {
      console.error(`❌ Failed to process file: ${filePath}`, err);
      return null;
    }
  }

  /**
   * Starts a file watcher on the vault.
   * @param {Function} onChange - Callback (event, fileObj) => void
   */
  watch(onChange) {
    if (this.watcher) return;

    console.log(`👀 Watching for changes in: ${this.vaultPath}`);
    
    this.watcher = chokidar.watch(this.vaultPath, {
      ignored: /(^|[\/\\])(\.incybe|\.obsidian|\.trash|\.git|node_modules)/,
      persistent: true,
      ignoreInitial: true, 
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    const handleEvent = async (event, path) => {
      if (!path.endsWith('.md')) return;
      
      if (event === 'unlink') {
        console.log(`🗑️ File deleted: ${path}`);
        this.documents.delete(path);
        onChange('unlink', { path });
      } else {
        console.log(`📝 File ${event}: ${path}`);
        const doc = await this.processFile(path);
        if (doc) {
          this.documents.set(path, doc);
          onChange(event, doc);
        }
      }
    };

    this.watcher
      .on('add', p => handleEvent('add', p))
      .on('change', p => handleEvent('change', p))
      .on('unlink', p => handleEvent('unlink', p));
  }
}