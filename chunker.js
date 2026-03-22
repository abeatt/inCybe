/**
 * Splits text into chunks with overlap.
 * @param {string} text - The full document text
 * @param {number} chunkSize - Rough character count per chunk (default 1000 chars ~= 200-300 tokens)
 * @param {number} overlap - Overlap size in characters
 * @returns {string[]} Array of chunk strings
 */
export function chunkText(text, chunkSize = 1000, overlap = 100) {
  if (!text || text.length <= chunkSize) return [text];

  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + chunkSize;

    // If we are not at the end, try to break at a newline or space to avoid cutting words
    if (endIndex < text.length) {
      const lastSpace = text.lastIndexOf(' ', endIndex);
      const lastNewline = text.lastIndexOf('\n', endIndex);
      
      // Prefer breaking at newlines for markdown structure
      if (lastNewline > startIndex + chunkSize * 0.5) {
        endIndex = lastNewline;
      } else if (lastSpace > startIndex + chunkSize * 0.5) {
        endIndex = lastSpace;
      }
    }

    const chunk = text.slice(startIndex, endIndex).trim();
    if (chunk.length > 0) chunks.push(chunk);

    // Move forward, subtracting overlap
    startIndex = endIndex - overlap;
  }

  return chunks;
}