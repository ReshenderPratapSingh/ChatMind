/**
 * server/utils/embed.js
 *
 * Local embedding generator using @xenova/transformers (all-MiniLM-L6-v2).
 * Runs completely locally in Node — no external API calls, no billing, no rate limits.
 * Produces 384-dimensional normalized vectors for Atlas Vector Search.
 */

let pipelinePromise = null;

const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
const EXPECTED_DIMENSION = 384;

/**
 * Lazily loads and caches the feature extraction pipeline.
 */
async function getPipeline() {
  if (!pipelinePromise) {
    pipelinePromise = (async () => {
      const { pipeline } = await import('@xenova/transformers');
      return await pipeline('feature-extraction', MODEL_NAME);
    })();
  }
  return pipelinePromise;
}

/**
 * Generate a 384-dimensional vector embedding for a single text.
 * @param {string} text
 * @returns {Promise<number[]>} 384-length float array
 */
async function getEmbedding(text) {
  const extractor = await getPipeline();
  const cleanText = (typeof text === 'string' && text.trim()) ? text.trim() : ' ';
  const output = await extractor(cleanText, {
    pooling: 'mean',
    normalize: true,
  });
  return Array.from(output.data);
}

/**
 * Generate embeddings for an array of texts.
 * @param {string[]} texts
 * @returns {Promise<number[][]>} Array of 384-length float arrays
 */
async function getEmbeddingsBatch(texts) {
  const extractor = await getPipeline();
  const results = [];
  for (let i = 0; i < texts.length; i++) {
    const cleanText = (typeof texts[i] === 'string' && texts[i].trim()) ? texts[i].trim() : ' ';
    const output = await extractor(cleanText, {
      pooling: 'mean',
      normalize: true,
    });
    results.push(Array.from(output.data));

    if ((i + 1) % 50 === 0 || i === texts.length - 1) {
      console.log(`  ⚡ Embedded ${i + 1}/${texts.length} messages locally...`);
    }
  }
  return results;
}

module.exports = {
  getEmbedding,
  getEmbeddingsBatch,
  EXPECTED_DIMENSION,
};
