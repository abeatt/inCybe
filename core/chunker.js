/**
 * Chunks text into overlapping segments for RAG.
 * @param {string} text - The input document content.
 * @param {number} chunkSize - Target size of each chunk (characters).
 * @param {number} overlap - Number of characters to overlap between chunks.
 * @returns {string[]} An array of text chunks.
 */
function chunkText(text, chunkSize = 1000, overlap = 100) {
  if (!text) return [];
  if (text.length <= chunkSize) return [text];

  const chunks = [];
  let startIndex = 0;
  const step = chunkSize - overlap;

  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    chunks.push(text.substring(startIndex, endIndex));
    
    if (endIndex >= text.length) break;
    startIndex += (step > 0 ? step : chunkSize);
  }

  return chunks;
}

export { chunkText };